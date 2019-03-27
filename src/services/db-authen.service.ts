import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';

import { generate } from 'password-hash';
import { Tokens } from '../entity/tokens.entity';
import { Members } from '../entity/members.entity';

import * as moment from 'moment';
import { IAuthen } from '../interfaces/authen.interface';

@Injectable()
export class DBAuthenService implements IAuthen {
  public constructor(
    @InjectRepository(Tokens) private readonly tokenRepository: Repository<Tokens>,
  ) {}

/**
 * สร้าง Token
 * @access public
 * @return void
 */
  public async generateAccessToken(memberData: Members): Promise<any> {
    if (!memberData) {
      return 'Member data not set.';
    }

    const token: Tokens = new Tokens();
    token.members = memberData;
    token.access_token = generate(Math.random().toString());
    token.exprise = moment().add(30, 'minute').format('YYYY-MM-DD h:mm:ss');

    const savedData = await this.tokenRepository.save(token);

    return savedData.access_token;
  }

/**
 * validateUser
 * @param accessToken: string
 * @access public
 * @return Promise<Members>
 */
  public async validateUser(accessToken: string): Promise<any> {
    try {
      const token = await this.tokenRepository
                          .createQueryBuilder('tokens')
                          .innerJoinAndSelect('tokens.members', 'members')
                          .where('tokens.access_token = :access_token', {access_token: accessToken})
                          .getOne();
      // const token = await this.tokenRepository.findOne({
      //   join: {
      //     alias: 'token',
      //     innerJoinAndSelect: {
      //       member: 'token.member',
      //     },
      //   },
      //   where: {
      //     access_token: accessToken,
      //   },
      // });

      if (!token) {
        throw new Error('Token exprie or token not match.');
      }
      if ((moment(token.exprise).format('YYYY-MM-DD h:mm:ss')) > (moment().format('YYYY-MM-DD h:mm:ss'))) {
        await delete token.members.password;
        return token.members;
      }
    } catch (e) {
      return e.message;
    }
  }

}

@Injectable()
export class DBAuthenStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: DBAuthenService) {
    super();
  }

  async validate(accessToken: string) {
    const user = await this.authService.validateUser(accessToken);
    if (!user) {
      throw new UnauthorizedException('please login.', 'Unauthorized');
    }
    return user;
  }
}
