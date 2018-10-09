import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { generate, verify } from 'password-hash';

import { Members } from 'entity/members.entity';
import { SavedResponse, LoginResponse } from 'interfaces/app.interface';
import { LogingModel } from 'models/login.model';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Members) private readonly memnberRepository: Repository<Members>,
  ) {}

  public root(): string {
    return 'Hello World!!';
  }

  public async findAllAccount(): Promise<Members[]> {
    return await this.memnberRepository.find();
  }

  public async findAccount(id: number): Promise<Members> {
    const account = await this.memnberRepository.findOne({ id: (id) });
    return account;
  }

  private async findAccountByEmail(email: string): Promise<any[]> {
    const [account, number] = await this.memnberRepository.findAndCount({ email: (email) });
    const data = [account, number];
    return data;
  }

  private async findAccountByUsername(username: string): Promise<any[]> {
    const [account, number] = await this.memnberRepository.findAndCount({ username: (username)});
    const data = [account, number];
    return data;
  }

  public async register(memberSave): Promise<SavedResponse> {
    try {
      let member = new Members();
      member = Object.assign(memberSave);

      const duplicateEmail = await this.findAccountByEmail(member.email);
      if (duplicateEmail[1] > 0) {
        throw new Error('Email alredy exit.');
      }

      const duplcateUsername = await this.findAccountByUsername(member.username);
      if (duplcateUsername[1] > 0) {
        throw new Error('User name alredy exit.');
      }

      member.password = generate(member.password);
      const savedData = await this.memnberRepository.save(member);

      // tslint:disable-next-line:no-console
      console.log('Cat has been saved -> ' /*, savedData*/);

      const response: SavedResponse = Object.assign({status: true, data: savedData});
      return response;
    } catch (e) {
      const error: SavedResponse = Object.assign({status: false, error: e.message });
      return error;
    }
  }

  public async login(loginData: LogingModel): Promise<LoginResponse> {
    try {
      const account = await this.findAccountByUsername(loginData.username);

      if (account[1] === 0) {
        throw new Error('User name not exit.');
      }
      const password = verify(loginData.password, account[0][0].password);

      if (!password) {
        throw new Error('Password not correct.');
      }

      const response: LoginResponse = Object.assign({
        status: true,
        data: account[0][0],
      });
      return response;
    } catch (e) {
      const error: LoginResponse = Object.assign({
        status: false,
        error: e.message,
      });
      return error;
    }
  }
}
