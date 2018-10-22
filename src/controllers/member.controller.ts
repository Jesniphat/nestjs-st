import { Controller, Get, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('api/member')
@UseGuards(AuthGuard('jwt'))
export class MemberControlle {
  /**
   * userLogin
   * @access public
   * @return Promise<any>
   */
  @Get('data')
  public async userLogin(@Req() req: Request, @Res() res: Response): Promise<any> {
    if (typeof req.user === 'object') {
      return await res.status(HttpStatus.OK).send({
        statusCode: 200,
        success: 'OK',
        data: req.user,
      });
    } else {
      return await res.status(HttpStatus.UNAUTHORIZED).send({
        statusCode: 401,
        error: 'UNAUTHORIZED',
        messages: req.user,
      });
    }
  }

}