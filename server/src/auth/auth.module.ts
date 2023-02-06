import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';

import { UserSession } from 'src/database/entities/user-session.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/resources/user/user.module';
import { JwtStrategy } from './strategies/jwt-accesstoken.strategy';
import { CachingService } from 'src/caching/caching.service';
import { CachingModule } from 'src/caching/caching.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserSession]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwtAuth').jwt_token_secret,
        signOptions: {
          expiresIn: configService.get('jwtAuth').access_token_ttl,
        },
      }),
    }),
    CachingModule,
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, ConfigService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
