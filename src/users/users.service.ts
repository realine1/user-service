import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; // Import Repository from TypeORM
import { User } from './user.entity'; // Import User entity
import { CreateUserDto } from './dto/create-user.dto'; // Import DTO (Data Transfer Object)
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) // Inject the UserRepository
    private userRepository: Repository<User>, // Declare the UserRepository
  ) {}

  // Create a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if username already exists
    const existingUser = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });

    // If username exists, throw an error
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    // Hash password before saving to the database
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);


    const user = this.userRepository.create({ password: createUserDto.password, ...CreateUserDto}); // Create a new user
    return this.userRepository.save(user); // Save the user in the database
  }

  // Find all users
  async findAll(): Promise<User[]> {
    return this.userRepository.find(); // Get all users from the database
  }

  // Find a user by ID
  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } }); // Find user by ID
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  }

  // Find a user by username
  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } }); // Find user by username
    if (!user) {
      throw new Error(`User with username ${username} not found`);
    }
    return user;
  }
}
