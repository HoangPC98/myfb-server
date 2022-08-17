import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import * as redisStore from 'cache-manager-redis-store';
// import { AuthGuardLogin } from './auth/gaurds/common-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './auth/gaurds/jwt-guard';
import { FriendShipModule } from './resources/friend-ship/friend-ship.module';
import { UserModule } from './resources/user/user.module';
import { PostModule } from './resources/post/post.module';
import { ReactionModule } from './resources/reaction/reaction.module';
import { CommentModule } from './resources/comment/comment.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
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
    DatabaseModule,
    AuthModule,
    UserModule,
    PostModule,
    FriendShipModule,
    ReactionModule,
    CommentModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
