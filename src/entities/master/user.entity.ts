import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as uuid from 'uuid';
import { HasRoles } from './has-roles.entity';
@Entity()
export class User {
  @PrimaryColumn({ length: 36, default: uuid.v7() })
  id?: string;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: true })
  password?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn({ nullable: true, type: 'timestamp' })
  deletedAt?: Date;

  @OneToMany(() => HasRoles, (hasRoles) => hasRoles.user_id)
  hasRoles?: HasRoles[];
}
