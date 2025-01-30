import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', // Load environment variables
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',              // Database type is MySQL
      host: process.env.DB_HOST,  // Get host from .env
      port: +(process.env.DB_PORT || 3306), // Get port from .env or use default 3306
      username: process.env.DB_USERNAME, // Get username from .env
      password: process.env.DB_PASSWORD, // Get password from .env
      database: process.env.DB_NAME, // Get database name from .env
      entities: [User],           // Register the User entity
      synchronize: true,          // Be cautious with synchronize: true in production
    }),
    UsersModule, // Import UsersModule
  ],
})
export class AppModule {}
