import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';

import { LoginSession } from 'src/database/entities/login-session.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/resources/user/user.module';
import { UserRepository } from 'src/resources/user/user.repository';
import { JwtStrategy } from './strategies/jwt-accesstoken.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, LoginSession]),
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
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, ConfigService, JwtStrategy],
})
export class AuthModule {}
