import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, VersioningType, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TransformResponseInterceptor } from './common/interceptors/transform.response.interceptor';
import * as admin from 'firebase-admin';
import firebaseConfig from './resources/notification/config/fcm.config';
// import firebaseConfig from './notification/firebaseConfig';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule);

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

  const configService = app.get(ConfigService);

  app.useGlobalInterceptors(new TransformResponseInterceptor());

  admin.initializeApp({ credential: admin.credential.cert(firebaseConfig) });

  const port = configService.get<number>('port');
  await app.listen(port);
  logger.log(`listening on port ${port}`);
}
bootstrap();
