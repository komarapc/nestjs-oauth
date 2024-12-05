import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permission } from './permission.entity';

@Entity({ name: 'resources' })
export class Resource {
  @PrimaryColumn()
  id?: string;
  @Column({ unique: true })
  name?: string;
  @Column({ nullable: true })
  path?: string;
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Permission, (permission) => permission.resource)
  permissions?: Permission[];
}
