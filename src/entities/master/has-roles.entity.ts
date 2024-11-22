import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Roles } from './roles.entity';

@Entity()
export class HasRoles {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id?: string;

  @Column()
  role_id?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @ManyToOne(() => User, (user) => user.hasRoles)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @ManyToOne(() => Roles, (role) => role.hasRoles)
  @JoinColumn({ name: 'role_id' })
  role?: Roles;
}
