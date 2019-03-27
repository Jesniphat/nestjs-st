import { Get, Controller, Post, Body, Res, HttpStatus  } from '@nestjs/common';
import { AccountService } from '../services/account.service';
// import { Members } from '../entity/members.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AccountService) {}

  @Get()
  root(): any {
    // return this.appService.root();
    return this.appService.findAllAccount();
  }

  @Post()
  async create(@Body() memberSave, @Res() res): Promise<any> {
    // console.log(memberSave); return;
    const result = await this.appService.register(memberSave);
    res.status(HttpStatus.CREATED).send({
      status: 200,
      data: result,
    });
  }
}
