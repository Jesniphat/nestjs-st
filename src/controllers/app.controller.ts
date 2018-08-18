import { Get, Controller, Post, Body, Res, HttpStatus  } from '@nestjs/common';
import { AppService } from 'services/app.service';
// import { Members } from '../entity/members.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): any {
    // return this.appService.root();
    return this.appService.findAll();
  }

  @Post()
  async create(@Body() memberSave, @Res() res): Promise<any> {
    // console.log(memberSave); return;
    const result = await this.appService.saveCat(memberSave);
    res.status(HttpStatus.CREATED).send({
      status: 200,
      data: result,
    });
  }
}
