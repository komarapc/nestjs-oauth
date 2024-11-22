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

  @OneToMany(() => HasRoles, (hasRoles) => hasRoles.role)
  hasRoles?: HasRoles[];
}
