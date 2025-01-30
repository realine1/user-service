import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.SERVICE_HOST || '0.0.0.0',
      port: +(process.env.SERVICE_PORT ?? 3002),
    },
  });

  console.log(`User-Service is listening on port ${process.env.SERVICE_PORT || 3002}`);
  await app.listen();
}
bootstrap();
