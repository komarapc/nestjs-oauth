import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Roles } from './roles.entity';

@Entity({ name: 'has_roles' })
export class HasRoles {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  id?: string;
  @Column({ type: 'varchar', length: 36 })
  user_id: string;
  @Column({ type: 'varchar', length: 36 })
  role_id: string;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => User, (user) => user.hasRoles)
  user?: User;
  @ManyToOne(() => Roles, (roles) => roles.hasRoles)
  roles?: Roles;
}
