import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Roles } from './roles.entity';
import { Resource } from './resource.entity';

@Entity({ name: 'permissions' })
export class Permission {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  id: string;
  @Column({ primary: false, type: 'varchar', length: 36 })
  role_id: string;
  @Column({ nullable: false, type: 'varchar', length: 36 })
  resource_id: string;
  @Column({ nullable: false, type: 'json' })
  action: Array<'create' | 'read' | 'update' | 'delete'>;
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => Roles, (role) => role.permissions)
  @JoinColumn({ name: 'role_id' })
  role: Roles;

  @ManyToOne(() => Resource, (resource) => resource.permissions)
  @JoinColumn({ name: 'resource_id' })
  resource: Resource;
}
