import { Column, Entity, PrimaryColumn } from 'typeorm';
import * as uuid from 'uuid';
@Entity()
export class User {
  @PrimaryColumn({ length: 36, default: uuid.v7() })
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  createdAt: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  updatedAt: Date;

  @Column({ nullable: true, type: 'timestamp' })
  deletedAt: Date;
}
