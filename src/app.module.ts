import { CacheInterceptor, CacheModule, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./config/configuration";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import * as redisStore from "cache-manager-redis-store";
// import { AuthGuardLogin } from './auth/gaurds/common-auth.guard';
import { JwtModule } from "@nestjs/jwt";
import { JwtAuthGuard } from "./auth/gaurds/jwt-guard";

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get("jwtAuth").jwt_token_secret,
        signOptions: {
          expiresIn: configService.get("jwtAuth").access_token_ttl,
        },
      }),
    }),
    DatabaseModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
