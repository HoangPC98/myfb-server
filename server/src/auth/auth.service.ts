import {
  Inject,
  Injectable,
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
import { LoginSession } from 'src/database/entities/login-session.entity';
import { Gender, User } from 'src/database/entities/user.entity';
import { JwtUserPayload } from 'src/types/data-types/auth-user.type';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly oAuth2Client: GoogleOAuth2Client;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(LoginSession)
    private loginSessionRepo: Repository<LoginSession>,
    private readonly jwtService: JwtService, // private readonly userRepo: UserRepository,
  ) {
    const { clientId, clientSecret } = this.configService.get('ggAuth');
    this.oAuth2Client = new GoogleOAuth2Client(clientId, clientSecret);
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

    const {
      hd: domain,
      email_verified,
      email,
      name,
      picture,
    } = ggLoginTicket.getPayload();

    if (!email_verified) {
      this.logger.error(`your email address: ${email} are not verified`);
      throw new UnauthorizedException();
    }
    let foundExistingUser;
    foundExistingUser = await this.userRepository.findOne({
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
      const getNewUser = await this.userRepository.save(newUser);
      foundExistingUser = getNewUser;
      userInfo = await this.userRepository.findOne({
        where: { id: getNewUser.id },
        relations: ['Profile'],
      });
      this.logger.log(`Create a new User with id = ${userInfo.id}`);
    } else {
      this.logger.log(
        `user ${foundExistingUser.id} : ${foundExistingUser.given_name} has login`,
      );
    }

    const checkUserLoginNewDevice = await this.loginSessionRepo.findOne({
      where: { user_id: foundExistingUser.id, uuid: uuid },
      withDeleted: true,
    });

    // if user not login this device with this uuid before
    if (!checkUserLoginNewDevice) {
      const newLoginUserNewDevice = new LoginSession();
      newLoginUserNewDevice.user_id = foundExistingUser.id;
      newLoginUserNewDevice.uuid = uuid;

      await this.loginSessionRepo.save(newLoginUserNewDevice);
    } // if login this device with user_id and uuid before
    else {
      checkUserLoginNewDevice.deletedAt = null;
      this.loginSessionRepo.save(checkUserLoginNewDevice);
    }

    const payload = await this.getJwtPayload(foundExistingUser, uuid);

    const tokens = await this.getToken(payload);

    return tokens;
  }

  async getNewRefreshToken(userPayload: JwtUserPayload) {
    console.log(`userPayload`, userPayload);
    return await this.getToken(userPayload);
  }

  async logOut(userlogin: JwtUserPayload): Promise<any> {
    try {
      console.log(`User ${userlogin.given_name} has logout`);

      return await this.loginSessionRepo.softDelete({ user_id: userlogin.uid });
    } catch (err) {
      this.logger.error('Logout Error: ', err.message);
      throw new Error(err.message);
    }
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

  async updateUser(user: User, payload): Promise<User> {
    const { given_name } = payload;
    let isModified = false;

    if (given_name !== user.given_name) {
      user.given_name = given_name;
      isModified = true;
    }

    isModified && this.loginSessionRepo.save(user);

    return user;
  }
}
