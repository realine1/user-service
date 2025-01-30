import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Import User entity
  providers: [UsersService], // Provide the UsersService
  controllers: [UsersController], // Provide the UsersController
})
export class UsersModule {}
