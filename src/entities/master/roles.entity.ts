import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { HasRoles } from './has-roles.entity';
import { Permission } from './permission.entity';

@Entity()
export class Roles {
  @PrimaryColumn({ length: 36, type: 'varchar' })
  id?: string;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @OneToMany(() => HasRoles, (hasRoles) => hasRoles.role, { cascade: true })
  hasRoles?: HasRoles[];

  @OneToMany(() => Permission, (permission) => permission.role, {
    cascade: true,
  })
  permissions?: Permission[];
}
