import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  LoginTicket,
  OAuth2Client as GoogleOAuth2Client,
} from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserSession } from 'src/database/entities/user-session.entity';
import { User } from 'src/database/entities/user.entity';
import { JwtUserPayload } from 'src/types/data-types/auth-user.type';
import { AuthType, Gender, OtpType, UserStatus } from 'src/types/enum-types/common.enum';
import { checkEmailOrPhone } from 'src/utils/checker.util';
import { MAX_WRONG_OTP_ENTRY, OTP_SECOND_REFRESH } from 'src/constants/common.constant';
import { SignUpDto } from './dto/sign-up.dto';
import { userInfo } from 'os';
import { smsSender } from 'src/common-services/send-sms.service';
import { CachingService } from 'src/caching/caching.service';
import bcrypt from 'bcrypt';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { otpService } from 'src/common-services/otp-config.service';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly oAuth2Client: GoogleOAuth2Client;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(UserSession)
    private userSessionRepo: Repository<UserSession>,
    private readonly jwtService: JwtService,
    private readonly cacheManager: CachingService,
  ) {
    const { clientId, clientSecret } = this.configService.get('ggAuth');
    this.oAuth2Client = new GoogleOAuth2Client(clientId, clientSecret);
  }

  

  async signUpStep1(signUpData: SignUpDto) {
    let emailOrPhone = checkEmailOrPhone(signUpData.email_or_phone)
    const userRec = await this.userRepo.createQueryBuilder().where(`${emailOrPhone} = :emp`, {emp: signUpData.email_or_phone}).execute()
    const userHoldForVerifying = await this.cacheManager.getter(`AccVerifying_${signUpData.email_or_phone}`)
    console.log('BEWBEBEB', userRec, userHoldForVerifying)
    if(userRec.length > 0 || userHoldForVerifying !== null)
      return new BadRequestException(`${emailOrPhone} ${signUpData.email_or_phone} already existed`)

    if(emailOrPhone == 'phone_number'){
      try {
        await this.cacheManager.setter(
          `AccVerifying_${signUpData.email_or_phone}`,
          `${JSON.stringify({...signUpData, otpSecret: otpService.generateSecret()})}`, 
          OTP_SECOND_REFRESH*10
        )
        const newOtp = await this.otpGenerator(signUpData.email_or_phone, OtpType.VerifyEmailOrPhone, {})
        return smsSender(signUpData.email_or_phone, `FB-${newOtp} is your ${emailOrPhone} verification code`)
        
      } catch (err) {
        return new BadRequestException(`Cannot send SMS to number ${signUpData.email_or_phone}`)
      }      
    }
  }

  async verifyOtpSubmission(otpCode: string, emailOrPhone: string, otpType: OtpType){
    var checkOtp = await this.otpCheck(otpCode, emailOrPhone, otpType)
    let emailOrPhoneT = checkEmailOrPhone(emailOrPhone)
    console.log('checkout_at --------', checkOtp)
    if(checkOtp.isValid == true){
      if(otpType == OtpType.VerifyEmailOrPhone){
        let thisSignUpDataHolding = await this.cacheManager.getter(`AccVerifying_${emailOrPhone}`);
        if(thisSignUpDataHolding == null)
          return new BadRequestException(`SignUp session expired`)
        let thisSignUpDataHoldingObj: SignUpDto = JSON.parse(thisSignUpDataHolding);
        const newUser = new User();
        Object.assign(newUser, thisSignUpDataHoldingObj)
        newUser.given_name = thisSignUpDataHoldingObj.first_name + ' ' +thisSignUpDataHoldingObj.last_name;
        newUser[emailOrPhoneT] = emailOrPhone;
        newUser.auth_type = AuthType.UsernamePasswordAuth;
        try {
          newUser.password = await bcrypt.hash(thisSignUpDataHoldingObj.password, +process.env.HASH_PSW_SALTROUND || 10);
          newUser.secret = otpService.generateSecret();
          await this.userRepo.save(newUser)
        } catch (err) {
          this.logger.error(err);
          return new InternalServerErrorException('Error when verifying OTP')
        }
      }
    }
    return checkOtp
  }

  async loginGoogle(ggToken: string, uuid: string) {
    const { clientId, authorizedDomain } = this.configService.get('ggAuth');

    let ggLoginTicket: LoginTicket;
    try {
      ggLoginTicket = await this.oAuth2Client.verifyIdToken({
        idToken: ggToken,
        audience: clientId,
      });
    } catch (error) {
      this.logger.error(`Google verify token on google failure: ${error}`);
      throw new UnauthorizedException(`Google verify token on google failure`);
    }

    // console.log('...',  this.oAuth2Client.)
    const {
      hd: domain,
      email_verified,
      email,
      name,
      picture,
    } = ggLoginTicket.getPayload();

    console.log('...', ggLoginTicket.getPayload());
    if (!email_verified) {
      this.logger.error(
        ` domain ${domain} not authorized or email ${email} not verified`,
      );
      throw new UnauthorizedException();
    }
    let foundExistingUser;
    foundExistingUser = await this.userRepo.findOne({
      where: { email: email },
    });

    let userInfo = foundExistingUser;

    const nameSplit = name.split(' ');
    const firstName = nameSplit.shift();
    const lastName = nameSplit.join(' ');
    console.log('name,,,', firstName, lastName);

    if (!foundExistingUser) {
      console.log(`foundExistingUser`);
      const newUser = new User();
      newUser.email = email;
      newUser.given_name = name;
      newUser.first_name = firstName;
      newUser.last_name = lastName;
      newUser.avatar_url = picture;
      newUser.gender = Gender.Other;
      newUser.avatar_url = picture;

      console.log('user....', newUser);
      const getNewUser = await this.userRepo.save(newUser);
      foundExistingUser = getNewUser;
      userInfo = await this.userRepo.findOne({
        where: { id: getNewUser.id },
        relations: ['Profile'],
      });
      this.logger.log(`Create a new User with id = ${userInfo.id}`);
    } else {
      this.logger.log(
        `user ${foundExistingUser.id} : ${foundExistingUser.given_name} has login`,
      );
    }

    const checkUserLoginNewDevice = await this.userSessionRepo.findOne({
      where: { user_id: foundExistingUser.id, uuid: uuid },
      withDeleted: true,
    });

    // if user not login this device with this uuid before
    if (!checkUserLoginNewDevice) {
      const newLoginUserNewDevice = new UserSession();
      newLoginUserNewDevice.user_id = foundExistingUser.id;
      newLoginUserNewDevice.uuid = uuid;

      await this.userSessionRepo.save(newLoginUserNewDevice);
    } // if login this device with user_id and uuid before
    else {
      checkUserLoginNewDevice.deletedAt = null;
      this.userSessionRepo.save(checkUserLoginNewDevice);
    }

    const payload = await this.getJwtPayload(foundExistingUser, uuid);

    const tokens = await this.getToken(payload);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  private async getToken(payload) {
    this.logger.debug('Start Get new Token...');
    const payloadRefreshToken = {
      sub: payload.sub,
      email: payload.email,
      uuid: payload.uuid,
    };
    try {
      this.logger.debug('begin sign token...');
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(payload, {
          secret: this.configService.get('jwtAuth').jwt_token_secret,
          expiresIn: this.configService.get('jwtAuth').access_token_ttl,
        }),
        this.jwtService.signAsync(payloadRefreshToken, {
          secret: this.configService.get('jwtAuth').jwt_token_secret,
          expiresIn: this.configService.get('jwtAuth').refresh_token_ttl,
        }),
      ]);

      return {
        accessToken,
        refreshToken,
      };
    } catch (err) {
      this.logger.error(err.message);
      throw new Error(`Error when sign Token ${err.message}`);
    }
  }

  private async getJwtPayload(userRec, uuid): Promise<JwtUserPayload> {
    return {
      uid: userRec.id,
      email: userRec.email,
      given_name: userRec.give_name,
      first_name: userRec.first_name,
      last_name: userRec.last_name,
      uuid: uuid,
      avatar_url: userRec.avatar_url,
      iat: Math.floor(Date.now() / 1000),
    };
  }

  async logOut(userlogin: JwtUserPayload): Promise<any> {
    // const decodeToken = this.jwtService.decode(token);
    try {
      console.log(`User ${userlogin.given_name} has logout`);

      return await this.userSessionRepo.delete({ user_id: userlogin.uid });
    } catch (err) {
      this.logger.error('Logout Error: ', err.message);
      throw new Error(err.message);
    }
  }

  async updateUser(user: User, payload): Promise<User> {
    const { given_name } = payload;
    let isModified = false;

    if (given_name !== user.given_name) {
      user.given_name = given_name;
      isModified = true;
    }

    isModified && this.userSessionRepo.save(user);

    return user;
  }

  private async otpGenerator(emailOrPhoneNumber: string, otpType: OtpType, otpOptions:any) {
   
    let emailOrPhone = checkEmailOrPhone(emailOrPhoneNumber)
    let whereObj = {}
    if (emailOrPhone === 'email')
      whereObj['email'] = emailOrPhoneNumber;
    else
      whereObj['phone_number'] = emailOrPhoneNumber
    var thisUser = await this.userRepo.findOne({ where: whereObj })
    var thisSecret: string;
    if(!thisUser && otpType === OtpType.VerifyEmailOrPhone){
      thisSecret = await this.cacheManager.getter(`AccVerifying_${emailOrPhoneNumber}`)
      thisSecret = JSON.parse(thisSecret).otpSecret;
    }
    else
      thisSecret = thisUser.secret;
    
    const otpByServer = otpService.generate(thisSecret)
    console.log(`>>> OTP Generated: ${otpByServer}, ${thisSecret}`)
    return otpByServer;
  }

  private async otpCheck(otpCode: string, emailOrPhoneNumber: string, otpType: OtpType) {
    const checkOtpResult = { isValid: true, message: 'OTP is verified successfully' }
    let emailOrPhone = checkEmailOrPhone(emailOrPhoneNumber)
    try {
      let userRec = await User.createQueryBuilder('user').where(`${emailOrPhone} = ${emailOrPhoneNumber}`).execute()
      console.log(`>>> OTP Check`, userRec)
      let secret: string;
      if (userRec.length == 0 && otpType == OtpType.VerifyEmailOrPhone) {
        let thisHodingCache = await this.cacheManager.getter(`AccVerifying_${emailOrPhoneNumber}`)
        if(!thisHodingCache)
          secret = otpService.generateSecret();
        else
          secret = JSON.parse(thisHodingCache).otpSecret
      }
      console.log('checking otp ===', otpCode, secret, emailOrPhoneNumber)
      const isValidOtp = otpService.check(otpCode, secret)
      console.log(' >>>> OTP CHECKING', isValidOtp, otpCode, secret)
      if (!isValidOtp) {
        const foundWrongOtpSubmit = await this.cacheManager.getter(`WrongOtpSubmit_${emailOrPhoneNumber}`)
        if (foundWrongOtpSubmit ==null) {
          await this.cacheManager.setter(`WrongOtpSubmit_${emailOrPhoneNumber}`, '1', 3600*24)
          checkOtpResult.isValid = false,
            checkOtpResult.message = `Sai OTP, tài khoản sẽ bị khoá sau ${MAX_WRONG_OTP_ENTRY} lần nhập sai`
        }
        else {
          const wrong_otp_time_current = await this.cacheManager.getter(`WrongOtpSubmit_${emailOrPhoneNumber}`)
          await this.cacheManager.setter(`WrongOtpSubmit_${emailOrPhoneNumber}`, String(wrong_otp_time_current+1), 3600*24)
          checkOtpResult.isValid = false,
          checkOtpResult.message = `Sai OTP, còn ${MAX_WRONG_OTP_ENTRY - +wrong_otp_time_current} lần thử`

          if (+wrong_otp_time_current >= 5) {
            await User
            .createQueryBuilder()
            .update(User)
            .set({ user_status: UserStatus.Locked })
            .where(`${emailOrPhone} = :emp `, {emp: emailOrPhoneNumber })
            .execute()
            checkOtpResult.message = `Bạn đã nhập sai mã OTP quá 5 lần, tài khoản của bạn đã bị khoá`
          }
        }
      }
      console.log('OTP reuilst...',checkOtpResult)
      return checkOtpResult;
    } catch (err) {
      console.log('ERROR: >>', err);
    }

  }
}
