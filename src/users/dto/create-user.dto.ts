export class CreateUserDto {
  readonly username: string;
  readonly password: string;
  readonly role: string;
  readonly fullName: string;
  readonly email: string;
}
