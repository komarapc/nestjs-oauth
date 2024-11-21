import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Roles {
  @PrimaryColumn({ length: 36, type: 'varchar' })
  id?: string;
  @Column()
  name: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;
  @Column({ type: 'timestamp', nullable: true })
  updatedAt?: Date;
  @Column({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
