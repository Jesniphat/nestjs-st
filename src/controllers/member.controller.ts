import { Controller, Get, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('api/member')
@UseGuards(AuthGuard('bearer'))
export class MemberControlle {
  /**
   * userLogin
   * @access public
   * @return Promise<any>
   */
  @Get('data')
  public async userLogin(@Req() req: Request, @Res() res: Response): Promise<any> {
    return await res.status(HttpStatus.OK).send({
      statusCode: 200,
      success: 'OK',
      data: req.user,
    });
  }

}