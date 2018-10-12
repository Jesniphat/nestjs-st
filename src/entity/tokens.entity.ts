import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tokens {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('int')
  public member_id: number;

  @Column('varchar', { length: 100 })
  public access_token: string;

  @Column('datetime', { default: null })
  public exprise: string;

  @Column({ default: true})
  public active: boolean;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  public created: string;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP' })
  public updated: string;
}
