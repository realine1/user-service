import { Controller, Post, Body, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Endpoint to create a new user
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // Endpoint to get a user by ID
  @Post(':id')
  async findOne(@Param('id') id: number) {
    return this.userService.findOneById(id);
  }

  // Endpoint to assign a role to a user
  @Patch(':id/assign-role')
  async assignRole(@Param('id') id: number, @Body() role: string) {
    return this.userService.assignRole(id, role);
  }
}
