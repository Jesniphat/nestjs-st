import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IAuthen } from 'interfaces/authen.interface';
import { Members } from 'entity/members.entity';
import { sign } from 'jsonwebtoken';

@Injectable()
export class JwtAuthenService implements IAuthen {
  static secretKey: string = 'Mr.Jesse';

  public constructor(
    @InjectRepository(Members) private readonly memberRepository: Repository<Members>,
  ) {

  }

/**
 * สร้าง Token
 * @access public
 * @return Promise<string>
 */
  public async generateAccessToken(memberData: Members): Promise<string> {
    const payload = { id: memberData.id };
    const token = await sign(payload, JwtAuthenService.secretKey, {expiresIn: 60 * 60});
    return token;
  }

/**
 * validateUser
 * @param data: { id: number, iat: number, exp: number}
 * @access public
 * @return Promise<any>
 */
  public async validateUser(data: { id: number, iat: number, exp: number}): Promise<any> {
    try {
      const member = await this.memberRepository.findOne(data.id);
      if (!member) {
        throw new Error('Token exprie or token not match.');
      }
      await delete member.password;
      return member;
    } catch (e) {
      return e.message;
    }
  }
}

@Injectable()
export class JwtAuthenStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: JwtAuthenService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JwtAuthenService.secretKey,
    });
  }

  async validate(payload: { id: number, iat: number, exp: number}) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new UnauthorizedException('please login.', 'Unauthorized');
    }
    return user;
  }
}
