import {
  BadRequestException,
  forwardRef,
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
import { MAX_WRONG_OTP_ENTRY, OTP_SECOND_REFRESH, SERVER_DOMAIN } from 'src/constants/common.constant';
// import { SignUpDto } from './dto/sign-up.dto';
import { CachingService } from 'src/caching/caching.service';
import bcrypt from 'bcrypt';
import { otpService } from 'src/common-services/otp-config.service';
// import { authenticator } from 'otplib';
import { UserService } from 'src/resources/user/user.service'
import { smsSender } from 'src/common-services/send-sms.service';
import { mailSender } from 'src/common-services/send-mail.service';
import { userInfo } from 'os';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly oAuth2Client: GoogleOAuth2Client;

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(UserSession) private readonly userSessionRepo: Repository<UserSession>,
    @Inject(forwardRef(() => UserService)) private userService: UserService,

    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly cacheManager: CachingService,
  ) {
    const { clientId, clientSecret } = this.configService.get('ggAuth');
    this.oAuth2Client = new GoogleOAuth2Client(clientId, clientSecret);
  }

  private async checkLoginNewDevice(userObj: User, headerObj: { uuid: string, userAgent: string }, token: string) {
    const newDeviceLoggedIn = await this.userSessionRepo.findOne({
      where: { user_id: userObj.id, uuid: headerObj.uuid },
      withDeleted: true,
    });

    // if user not login this device with this uuid before
    if (!newDeviceLoggedIn) {
      const newUserSession = new UserSession();
      newUserSession.user_id = userObj.id;
      newUserSession.email_or_phone = userObj.email || userObj.phone_number;
      newUserSession.uuid = headerObj.uuid;
      newUserSession.user_agent = headerObj.userAgent;
      newUserSession.session_type = AuthType.UsernamePasswordAuth
        newUserSession.token = token;
      await this.userSessionRepo.save(newUserSession);
      console.log(`>>> The first time login >>> user: ${newUserSession.email_or_phone} - uuid: ${headerObj.uuid}}`);
    } // if login this device with user_id and uuid before
    else {
      newDeviceLoggedIn.deletedAt = null;
      this.userSessionRepo.save(newDeviceLoggedIn);
    }
  }

  async signUpStep1(signUpData) {
    let emailOrPhone = checkEmailOrPhone(signUpData.email_or_phone)
    const userRec = await this.userRepo.createQueryBuilder().where(`${emailOrPhone} = :emp`, { emp: signUpData.email_or_phone }).execute()
    const userHoldForVerifying = await this.cacheManager.getter(`SsAccVerifying_${signUpData.email_or_phone}`)
    console.log('usersss', userHoldForVerifying, userRec)
    if (userRec.length > 0 || userHoldForVerifying) {
      return new BadRequestException(`${emailOrPhone} ${signUpData.email_or_phone} already existed`)
    }

    try {
      await this.cacheManager.setter(
        `SsAccVerifying_${signUpData.email_or_phone}`,
        `${JSON.stringify({ ...signUpData, otpSecret: otpService.generateSecret() })}`,
        OTP_SECOND_REFRESH * 7.5
      )
      const newOtp = await this.otpGenerator(signUpData.email_or_phone, OtpType.VerifyEmailOrPhone, emailOrPhone)
      let otpMsg = `FB-${newOtp} is your ${emailOrPhone} verification code`
      if(emailOrPhone === 'phone_number'){
        await smsSender(signUpData.email_or_phone, otpMsg)
        return { code: 201, message: `OTP code has been send to number ${signUpData.email_or_phone}` }
      }
      else {
        await mailSender(signUpData.email_or_phone, 'Verify your FB registration email', otpMsg)
        return { code: 201, message: `OTP code has been send to  ${signUpData.email_or_phone}` }
      }

    } catch (err) {
      return new BadRequestException(`Cannot send SMS to number ${signUpData.email_or_phone}`)
    }
  }

  async verifyOtpSubmission(otpCode: string, emailOrPhoneNumber: string, otpType: OtpType) {
    const checkOtpResult = { isValid: true, message: 'OTP is verified successfully' }
    let emailOrPhone = checkEmailOrPhone(emailOrPhoneNumber)
    var secret: string;

    let userRec = await User.createQueryBuilder('user').where(`${emailOrPhone} = :emp`,{emp: emailOrPhoneNumber}).execute()
    console.log('>>>>>>userRec', userRec)
    if (userRec.length == 0 && otpType == OtpType.VerifyEmailOrPhone) {
      let thisHodingCache = await this.cacheManager.getter(`SsAccVerifying_${emailOrPhoneNumber}`)
      if (!thisHodingCache) {
        secret = otpService.generateSecret();
      }
      else
        secret = JSON.parse(thisHodingCache).otpSecret
    }
    else
      secret = userRec[0].user_secret

    const isValidOtp = otpService.check(otpCode, secret)
    var foundWrongOtpSubmit = await this.cacheManager.getter(`SsWrongOtpSubmit_${emailOrPhoneNumber}`)
    let foundOtpSessionHolding = await Promise.all([
      this.cacheManager.getter(`SsAccVerifying_${emailOrPhoneNumber}`),
      this.cacheManager.getter(`SsForgotPassword_${emailOrPhoneNumber}`)
    ])
    // if (foundOtpSessionHolding.every(item => item == null))
    //   return new BadRequestException(`OTP session expired`)

    if (isValidOtp) {
      if (otpType == OtpType.VerifyEmailOrPhone) {
        let thisSignUpDataHolding = await this.cacheManager.getter(`SsAccVerifying_${emailOrPhoneNumber}`);
        let thisSignUpDataHoldingObj = JSON.parse(thisSignUpDataHolding);
        const newUser = new User();
        Object.assign(newUser, thisSignUpDataHoldingObj)
        newUser.given_name = thisSignUpDataHoldingObj.first_name + ' ' + thisSignUpDataHoldingObj.last_name;
        newUser[emailOrPhone] = emailOrPhoneNumber;
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
      await Promise.all([
        this.cacheManager.delete(`SsAccVerifying_${emailOrPhoneNumber}`),
        this.cacheManager.delete(`SsWrongOtpSubmit_${emailOrPhoneNumber}`)
      ])
    }
    else {
      if (foundWrongOtpSubmit == null && foundOtpSessionHolding) {
        await this.cacheManager.setter(`SsWrongOtpSubmit_${emailOrPhoneNumber}`, 1, 3600 * 24)
        checkOtpResult.isValid = false,
          checkOtpResult.message = `Sai OTP, tài khoản sẽ bị khoá sau ${MAX_WRONG_OTP_ENTRY} lần nhập sai`
      }
      else {
        var wrong_otp_time_current = await this.cacheManager.getter(`SsWrongOtpSubmit_${emailOrPhoneNumber}`)
        wrong_otp_time_current = wrong_otp_time_current + 1
        await this.cacheManager.setter(`SsWrongOtpSubmit_${emailOrPhoneNumber}`, wrong_otp_time_current, 3600 * 24)
        checkOtpResult.isValid = false,
          checkOtpResult.message = `Sai OTP, còn ${MAX_WRONG_OTP_ENTRY - +wrong_otp_time_current} lần thử`

        if (+wrong_otp_time_current >= 5) {
          await this.userService.changeUserStatus({ id: userRec.id }, UserStatus.Locked)
          checkOtpResult.message = `Bạn đã nhập sai mã OTP quá 5 lần, tài khoản của bạn đã bị khoá`
        }
      }
    }

    return { code: checkOtpResult.isValid ? 200 : 401, ...checkOtpResult };
  }

  async getNewOtp(otpType: OtpType, emailOrPhoneNumber: string): Promise<any> {
    let emp = checkEmailOrPhone(emailOrPhoneNumber)
    const newOtp = await this.otpGenerator(emailOrPhoneNumber, otpType, emp)
    let otpMsg = `FB-${newOtp} is your ${otpType} verification code`
    try {
      if(emp === 'phone_number'){
        await smsSender(emailOrPhoneNumber, otpMsg)
        return { code: 201, message: `OTP code has been send to number ${emailOrPhoneNumber}` }
      }
      else {
        await mailSender(emailOrPhoneNumber, `OTP code ${otpType}`, otpMsg)
        return { code: 201, message: `OTP code has been send to  ${emailOrPhoneNumber}` }
      }
    } catch (error) {
      return new InternalServerErrorException(error)
    }
  }

  async loginUsrPsw(emailOrPhoneNumber: string, password: string, uuid: string, userAgent: string) {
    let emp = checkEmailOrPhone(emailOrPhoneNumber)
    let whereObj = {}
    whereObj[emp] = emailOrPhoneNumber;
    const foundUser = await this.userRepo.findOne({ where: whereObj })
    if (!foundUser)
      return new BadRequestException(`${emp} ${emailOrPhoneNumber} not found`);
    
    const checkPass = await bcrypt.compare(password, foundUser.password) 
    if(checkPass === false)
      return new BadRequestException('Wrong password')

    const payload = await this.getJwtPayload(foundUser, uuid);

    const tokens = await this.getToken(payload);
    await this.checkLoginNewDevice(foundUser, { uuid, userAgent }, tokens.refreshToken)
    return {
      code: 201,
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      }
    };
  }

  async loginGoogle(ggToken: string, uuid: string, userAgent: string) {
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
    finally { }

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
    let foundExistingUser: User;
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
      newUser.secret = otpService.generateSecret();

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


    const payload = await this.getJwtPayload(foundExistingUser, uuid);

    const tokens = await this.getToken(payload);

    await this.checkLoginNewDevice(foundExistingUser, { uuid, userAgent }, tokens.refreshToken)

    return {
      code: 201,
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user: payload
      }
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

  private async otpGenerator(emailOrPhoneNumber: string, otpType: OtpType, emp: string) {
    let whereObj = {}
    if (emp === 'email')
      whereObj['email'] = emailOrPhoneNumber;
    else
      whereObj['phone_number'] = emailOrPhoneNumber
    var thisUser = await this.userRepo.findOne({ where: whereObj })
    var thisSecret: string;
    if (!thisUser && otpType === OtpType.VerifyEmailOrPhone) {
      thisSecret = await this.cacheManager.getter(`SsAccVerifying_${emailOrPhoneNumber}`)
      thisSecret = JSON.parse(thisSecret).otpSecret;
    }
    else
      thisSecret = thisUser.secret;

    const otpByServer = otpService.generate(thisSecret)
    console.log(`>>> OTP Generated: ${otpByServer}, ${thisSecret}`)
    return otpByServer
  }

  async sendOtpOrLinkVerification(emailOrPhoneNumber: string, otpType: OtpType) {
    let emailOrPhone = checkEmailOrPhone(emailOrPhoneNumber)
    console.log(`>>> OTP Verification`, emailOrPhone)
    if (otpType == OtpType.ForgotPassword) {
      if (emailOrPhone === 'email') {
        let thisUserSecret: string = (await this.userRepo.findOne({ email: emailOrPhoneNumber })).secret

        let resetPswToken: string = this.jwtService.sign(
          { email: emailOrPhoneNumber },
          { secret: process.env.JWT_RESET_PSW_TOKEN_SECRET, expiresIn: process.env.TTL_RESET_PSW || '5m' }
        )
        console.log(resetPswToken)
        let resetPswLink = `${SERVER_DOMAIN}:${process.env.SERVER_PORT}/users/forgot-password/form-fillout?link=${resetPswToken}`
        await mailSender(emailOrPhoneNumber, 'Reset Password Link', `Click the link below to reset your new password: ${resetPswLink}`)
        return { statusCode: 200, message: `A Reset Password Link has been sent to email ${emailOrPhoneNumber}` }
      }
      else if (emailOrPhone === 'phone_number') {
        const otpCode = await this.otpGenerator(emailOrPhoneNumber, otpType, emailOrPhone);
        let msg = `FB-${otpCode} is your code reset password`
        await smsSender(emailOrPhoneNumber, msg)
        return { statusCode: 200, message: `An OTP Code Reset Password has been sent to number ${emailOrPhoneNumber}` }
      }
    }

  }
}
