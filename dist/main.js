"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const transform_response_interceptor_1 = require("./common/interceptors/transform.response.interceptor");
async function bootstrap() {
    const logger = new common_1.Logger(bootstrap.name);
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        exposedHeaders: ['Content-Disposition'],
    });
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    app.setGlobalPrefix('v1');
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    const configService = app.get(config_1.ConfigService);
    app.useGlobalInterceptors(new transform_response_interceptor_1.TransformResponseInterceptor());
    const port = configService.get('port');
    await app.listen(port);
    logger.log(`listening on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map