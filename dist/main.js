"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const transform_response_interceptor_1 = require("./common/interceptors/transform.response.interceptor");
const admin = __importStar(require("firebase-admin"));
const fcm_config_1 = __importDefault(require("./resources/notification/config/fcm.config"));
async function bootstrap() {
    const logger = new common_1.Logger(bootstrap.name);
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        exposedHeaders: ['Content-Disposition'],
    });
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    const configService = app.get(config_1.ConfigService);
    app.useGlobalInterceptors(new transform_response_interceptor_1.TransformResponseInterceptor());
    admin.initializeApp({ credential: admin.credential.cert(fcm_config_1.default) });
    const port = configService.get('port');
    await app.listen(port);
    logger.log(`listening on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map