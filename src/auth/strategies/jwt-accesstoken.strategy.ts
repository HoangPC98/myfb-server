import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { CachingService } from 'src/caching/caching.service';
import { JwtUserPayload } from 'src/types/data-types/auth-user.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwtAuth').jwt_token_secret,
    });
  }

  async validate(payload: any): Promise<JwtUserPayload> {
    return {
      uid: payload.uid,
      email: payload.email,
      given_name: payload.username,
      first_name: payload.first_name,
      last_name: payload.last_name,
      uuid: payload.uuid,
      iat: payload.iat,
      avatar_url: payload.avatar_url,
    };
  }
}
