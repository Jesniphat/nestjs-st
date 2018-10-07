import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Members } from 'entity/members.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Members) private readonly memnberRepository: Repository<Members>,
  ) {}

  root(): string {
    return 'Hello World!!';
  }

  async findAccount(): Promise<Members[]> {
    return await this.memnberRepository.find();
  }

  async saveAccount(memberSave): Promise<Members> {
    try {
      let member = new Members();
      member = Object.assign(memberSave);

      const savedData = await this.memnberRepository.save(member);
      // tslint:disable-next-line:no-console
      console.log('Cat has been saved -> ' /*, savedData*/);

      return savedData;
    } catch (error) {
      return error;
    }
  }
}
