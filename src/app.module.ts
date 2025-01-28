import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';  // Replace with actual user module
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ // Load .env file into the environment
      isGlobal: true,  // Make variables globally available in the app
      envFilePath: '.env', // Path to .env file
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST, // Get from .env
      port: parseInt(process.env.MYSQL_PORT, 10), // Convert string to number
      username: process.env.MYSQL_USERNAME, // Get from .env
      password: process.env.MYSQL_PASSWORD, // Get from .env
      database: process.env.MYSQL_DATABASE, // Get from .env
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,  // Set to false in production
    }),
    UserModule,  // Import other modules (e.g., User module)
  ],
})
export class AppModule {}
