import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { generate } from 'password-hash';
import { Tokens } from 'entity/tokens.entity';
import { Members } from 'entity/members.entity';

@Injectable()
export class DBAuthenService {
  public constructor(
    @InjectRepository(Tokens) private readonly tokenRepository: Repository<Tokens>,
  ) {}

/**
 * สร้าง Token
 * @access public
 * @return void
 */
  public async generateAccessToken(memberData: Members): Promise<any> {
    const token: Tokens = new Tokens();
    token.member_id = memberData.id;
    token.access_token = generate(Math.random().toString());
    token.exprise = new Date().setMinutes(new Date().getMinutes() + 30 );

    const savedData = await this.tokenRepository.save(token);

    return savedData.access_token;
  }
}
