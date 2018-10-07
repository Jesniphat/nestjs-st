import { Get, Controller, Post, Body, Res, HttpStatus  } from '@nestjs/common';
import { AccountService } from 'services/account.service';
import { RegisterModel } from 'models/register.model';
import { ValidationPipe } from 'pipes/validation.pipe';

@Controller('api/account')
export class AccountController {
  constructor(private readonly appService: AccountService) {}

  @Get()
  async getAccount(): Promise<any> {
    return await this.appService.findAccount();
  }

  @Post('register')
  async register(@Body(new ValidationPipe()) memberSave: RegisterModel, @Res() res): Promise<any> {
    const result = await this.appService.saveAccount(memberSave);
    res.status(HttpStatus.CREATED).send({
      status: 200,
      data: result,
    });
  }
}
