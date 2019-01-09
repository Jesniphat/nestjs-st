import { Get, Controller, Post, Body, Res, Param, HttpStatus  } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { RegisterModel } from '../models/register.model';
import { ValidationPipe } from '../pipes/validation.pipe';
import { LogingModel } from '../models/login.model';

@Controller('api/account')
export class AccountController {
  constructor(private readonly appService: AccountService) {}

/**
 * / --get all account
 * @access public
 * @return Promise <any>
 */
  @Get()
  public async getAccounts(@Res() res: any): Promise<any> {
    const account = await this.appService.findAllAccount();
    return await res.status(HttpStatus.OK).send({
      statusCode: 200,
      success: 'OK',
      data: account,
    });
  }

/**
 * /id
 * get account by id
 * @access public
 * @return Promise<any>
 */
  @Get(':id')
  public async getAccountById(@Param('id') id, @Res() res: any): Promise<any> {
    const account = await this.appService.findAccount(id);

    return await res.status(HttpStatus.OK).send({
      statusCode: 200,
      success: 'OK',
      data: account,
    });
  }

/**
 * /register --Register staff
 * @param memberSave
 * @param res
 * @access public
 * @return Promise<any>
 */
  @Post('register')
  public async register(@Body(new ValidationPipe()) memberSave: RegisterModel, @Res() res: any): Promise<any> {
    await delete memberSave.cpassword;
    const result = await this.appService.register(memberSave);

    if (result.status) {
      await delete result.data.password;
      return await res.status(HttpStatus.CREATED).send({
        statusCode: 201,
        success: 'Created',
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

/**
 * /login --for login by staff
 * @param login
 * @param res
 * @access public
 * @return Promise<any>
 */
  @Post('login')
  public async login(@Body(new ValidationPipe()) login: LogingModel, @Res() res: any): Promise<any> {
    const logins = await this.appService.login(login);

    if (logins.status){
      return await res.status(HttpStatus.OK).send({
        statusCode: 200,
        success: 'OK',
        accesstoken: logins.data,
      });
    } else {
      return await res.status(HttpStatus.UNAUTHORIZED).send({
        statusCode: 401,
        error: 'Unauthorized',
        message: logins.error,
      });
    }
  }
}
