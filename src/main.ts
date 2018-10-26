import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import * as express from 'express';

export const BASE_DIR = __dirname;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // allow some path
  app.use('/uploads', express.static(BASE_DIR + '/uploads'));

  // allow origins
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
