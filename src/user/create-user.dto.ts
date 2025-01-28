import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;  // Allow duplicate username

  @IsEmail()
  email: string;  // Enforce unique email

  @IsString()
  @MinLength(6)
  password: string;
}
