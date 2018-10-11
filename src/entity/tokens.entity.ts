import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// import * as Moment from 'moment';

@Entity()
export class Tokens {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('int')
  public member_id: string;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  public created: string;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP' })
  public updated: string;

  @Column({ default: true})
  public active: boolean;
}