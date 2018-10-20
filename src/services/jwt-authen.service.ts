import { Injectable } from '@nestjs/common';
import { IAuthen } from 'interfaces/authen.interface';
import { Members } from 'entity/members.entity';
import { sign } from 'jsonwebtoken';

@Injectable()
export class JwtAuthenService implements IAuthen {
  private secretKey: string = 'Mr.Jesse';

/**
 * สร้าง Token
 * @access public
 * @return Promise<string>
 */
  public async generateAccessToken(memberData: Members): Promise<string> {
    const payload = { id: memberData.id, email: memberData.email };
    const token = await sign(payload, this.secretKey, {expiresIn: 60 * 60});
    return token;
  }

/**
 * validateUser
 * @param accessToken: string
 * @access public
 * @return Promise<Members>
 */
  public async validateUser(accessToken: string): Promise<Members> {
   return await Object.assign({});
  }
}
