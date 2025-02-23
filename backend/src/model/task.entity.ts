import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../modules/users/user.entity'; 

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'boolean', default: false })
  isComplete: boolean;

  @ManyToOne(() => User, (user) => user.tasks, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: User | null;
}
