import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'create-user' })
  async createUser(@Payload() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @MessagePattern({ cmd: 'get-all-user' })
  async findAllUser() {
    return this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'get-user' })
  async getUserByUsername(@Payload() username: string) {
    return this.usersService.findByUsername(username);
  }
}
