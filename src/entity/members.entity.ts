import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// import * as Moment from 'moment';

@Entity()
export class Members {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 200 })
  firstname: string;

  @Column('varchar', { length: 200 })
  lastname: string;

  @Column('varchar', { length: 100 })
  email: string;

  @Column('varchar', { length: 50 })
  password: string;

  @Column('varchar', { length: 100 })
  position: string;

  @Column({ length: 500 })
  image: string;

  @Column('char', { length: 30 })
  role: string;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  created: string;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP' })
  updated: string;

  @Column({ default: true})
  active: boolean;
}