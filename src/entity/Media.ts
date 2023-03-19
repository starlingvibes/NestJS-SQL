import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'media' })
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ['audio', 'image'] })
  type: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @Column({ type: 'enum', enum: ['active', 'inactive'] })
  status: string;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
