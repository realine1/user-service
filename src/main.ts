import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config'; // Import ConfigService
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get the port from the environment variables
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000; // Default to 3000 if not set in .env

  // Start the server
  await app.listen(port);
  Logger.log(`User Service is running on: http://localhost:${port}`);
}

bootstrap();
