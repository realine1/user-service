import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users') // Name of the table in MySQL
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  fullName: string;

  @Column()
  email: string;
}
