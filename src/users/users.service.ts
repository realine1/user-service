import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; // Import Repository from TypeORM
import { User } from './user.entity'; // Import User entity
import { CreateUserDto } from './dto/create-user.dto'; // Import DTO (Data Transfer Object)
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });

    if (existingUser) {
        throw new RpcException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);


    const user = this.userRepository.create({ ...createUserDto, password: hashedPassword});
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new RpcException(`User with username ${username} not found`);
    }
    return user;
  }
}
