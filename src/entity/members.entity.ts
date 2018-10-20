
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Tokens } from './tokens.entity';

@Entity()
export class Members {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('varchar', { length: 200 })
  public firstname: string;

  @Column('varchar', { length: 200 })
  public lastname: string;

  @Column('varchar', { length: 100})
  public username: string;

  @Column('varchar', { length: 100 })
  public email: string;

  @Column('varchar', { length: 500 })
  public password: string;

  @Column('varchar', { length: 100 })
  public position: string;

  @Column({ length: 500, default: 'NO' })
  public image: string;

  @Column('char', { length: 30, default: 0 })
  public role: string;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  public created: string;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP' })
  public updated: string;

  @Column({ default: true})
  public active: boolean;

  @OneToMany(type => Tokens, token => token.member)
  public token: Tokens[];
}