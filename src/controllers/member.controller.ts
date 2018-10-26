import { Controller, Get, UseGuards, Req, Res, HttpStatus, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { Profile } from 'models/profile.model';
import { ValidationPipe } from 'pipes/validation.pipe';
import { MemberService } from 'services/member.service';

@Controller('api/member')
@UseGuards(AuthGuard('jwt'))
export class MemberControlle {

  /**
   * constructor
   */
  public constructor(private readonly memberService: MemberService) {}

  /**
   * userLogin
   * @access public
   * @return Promise<any>
   */
  @Get('data')
  public async userLogin(@Req() req: Request, @Res() res: Response): Promise<any> {
    if (typeof req.user === 'object') {
      req.user.image = req.user.image ? 'http://localhost:3000' + req.user.image : '';
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

  /**
   * updateProfile
   * @param @Req() res: Request
   * @param @Body(new Validation) body: Profile
   * @param @Res() res: Response
   * @access public
   * @return Promise<any>
   */
  @Post('profile')
  public async updateProfile(@Req() req: Request, @Body(new ValidationPipe()) body: Profile, @Res() res: Response): Promise<any> {
    const result = await this.memberService.onUpdateProfile(req.user.id, body);

    if (result.status) {
      await delete result.data.password;
      return await res.status(HttpStatus.OK).send({
        statusCode: 200,
        success: 'OK',
        data: result.data,
      });
    } else {
      return await res.status(HttpStatus.BAD_REQUEST).send({
        statusCode: 400,
        error: 'Bad Request',
        message: result.error,
      });
    }
  }

}
