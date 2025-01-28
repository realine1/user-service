import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(["email"])  // Ensures email is unique in the database
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;  // Allow duplicate username

  @Column({ unique: true })  // Ensure email is unique
  email: string;

  @Column()
  password: string;
}
