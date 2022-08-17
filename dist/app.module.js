"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const configuration_1 = __importDefault(require("./config/configuration"));
const database_module_1 = require("./database/database.module");
const auth_module_1 = require("./auth/auth.module");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const jwt_guard_1 = require("./auth/gaurds/jwt-guard");
const friend_ship_module_1 = require("./resources/friend-ship/friend-ship.module");
const user_module_1 = require("./resources/user/user.module");
const post_module_1 = require("./resources/post/post.module");
const reaction_module_1 = require("./resources/reaction/reaction.module");
const comment_module_1 = require("./resources/comment/comment.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ load: [configuration_1.default], isGlobal: true }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
            }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('jwtAuth').jwt_token_secret,
                    signOptions: {
                        expiresIn: configService.get('jwtAuth').access_token_ttl,
                    },
                }),
            }),
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            post_module_1.PostModule,
            friend_ship_module_1.FriendShipModule,
            reaction_module_1.ReactionModule,
            comment_module_1.CommentModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_guard_1.JwtAuthGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map