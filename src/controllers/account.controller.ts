import { Get, Controller, Post, Body, Res, Param, HttpStatus  } from '@nestjs/common';
import { AccountService } from 'services/account.service';
import { RegisterModel } from 'models/register.model';
import { ValidationPipe } from 'pipes/validation.pipe';

@Controller('api/account')
export class AccountController {
  constructor(private readonly appService: AccountService) {}

  @Get()
  async getAccounts(): Promise<any> {
    return await this.appService.findAllAccount();
  }

  @Get(':id')
  async getAccountById(@Param('id') id): Promise<any> {
    return await this.appService.findAccount(1);
  }

  @Post('register')
  async register(@Body(new ValidationPipe()) memberSave: RegisterModel, @Res() res): Promise<any> {
    await delete memberSave.cpassword;
    const result = await this.appService.register(memberSave);

    if (result.status) {
      await delete result.data.password;
      res.status(HttpStatus.CREATED).send({
        statusCode: 201,
        success: 'Created',
        data: result.data,
      });
    } else {
      res.status(HttpStatus.BAD_REQUEST).send({
        statusCode: 400,
        error: 'Bad Request',
        message: result.error,
      });
    }
  }
}
