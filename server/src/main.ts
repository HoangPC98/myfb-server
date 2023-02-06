import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TransformResponseInterceptor } from './common/interceptors/transform.response.interceptor';
import * as admin from 'firebase-admin';
import firebaseConfig from './resources/notification/config/fcm.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import logger from './utils/logger';
// import firebaseConfig from './notification/firebaseConfig';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);


  app.enableCors({
    exposedHeaders: ['Content-Disposition'],
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  global.log = logger;

  const configService = app.get(ConfigService);

  // app.useGlobalInterceptors(new TransformResponseInterceptor());
  app.useStaticAssets(join(__dirname, 'assets'));
  app.setBaseViewsDir(join(__dirname, 'assets'));
  app.setViewEngine('ejs');

  admin.initializeApp({ credential: admin.credential.cert(firebaseConfig) });

  const port = configService.get<number>('port');
  await app.listen(port);
  logger.debug(`listening on port ${port}`);
}
bootstrap();
