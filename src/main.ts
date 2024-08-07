import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  await app.listen(port, '127.0.0.1');
  const url = await app.getUrl();
  const displayUrl = url.replace('127.0.0.1', 'localhost');
  console.log(`Application is running on: ${displayUrl}`);
}
bootstrap();
