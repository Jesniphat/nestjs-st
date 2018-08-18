import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Members } from 'entity/members.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Members) private readonly catRepository: Repository<Members>,
  ) {}

  root(): string {
    return 'Hello World!!';
  }

  async findAll(): Promise<Members[]> {
    return await this.catRepository.find();
  }

  async saveCat(memberSave): Promise<Members[]> {
    try {
      let member = new Members();
      member = Object.assign(memberSave);

      await this.catRepository.save(member);
      // tslint:disable-next-line:no-console
      console.log('Cat has been saved');

      const savedMembers = await this.catRepository.find();
      // tslint:disable-next-line:no-console
      console.log('All cats from the db: ', savedMembers);

      return savedMembers;
    } catch (error) {
      return error;
    }
  }
}
