import { Get, Controller, Post, Body, Res, Param, HttpStatus  } from '@nestjs/common';
import { AccountService } from 'services/account.service';
import { RegisterModel } from 'models/register.model';
import { ValidationPipe } from 'pipes/validation.pipe';
import { LogingModel } from 'models/login.model';

@Controller('api/account')
export class AccountController {
  constructor(private readonly appService: AccountService) {}

  @Get()
  public async getAccounts(): Promise<any> {
    return await this.appService.findAllAccount();
  }

  @Get(':id')
  public async getAccountById(@Param('id') id): Promise<any> {
    return await this.appService.findAccount(1);
  }

  @Post('register')
  public async register(@Body(new ValidationPipe()) memberSave: RegisterModel, @Res() res: any): Promise<void> {
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

  @Post('login')
  public async login(@Body(new ValidationPipe()) login: LogingModel, @Res() res: any): Promise<void> {
    const logins = await this.appService.login(login);

    if (logins.status){
      res.status(HttpStatus.OK).send({
        statusCode: 200,
        success: 'OK',
        accesstoken: logins.data,
      });
    } else {
      res.status(HttpStatus.UNAUTHORIZED).send({
        statusCode: 401,
        error: 'Unauthorized',
        message: logins.error,
      });
    }
  }
}
