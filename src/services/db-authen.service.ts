import { Injectable } from '@nestjs/common';
import { generate } from 'password-hash';

@Injectable()
export class DBAuthenService {
/**
 * สร้าง Token
 * @access public
 * @return void
 */
  public generateAccessToken() {
    return generate(Math.random().toString());
  }
}
