import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from 'controllers/app.controller';
import { AccountController } from 'controllers/account.controller';

import { AccountService } from 'services/account.service';
import { DBAuthenService, DBAuthenStrategy } from 'services/db-authen.service';
import { JwtAuthenService } from 'services/jwt-authen.service';

import { Members } from 'entity/members.entity';
import { Tokens } from 'entity/tokens.entity';
import { MemberControlle } from 'controllers/member.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([Members, Tokens]),
  ],
  controllers: [
    AppController,
    AccountController,
    MemberControlle,
  ],
  providers: [
    AccountService,
    DBAuthenService,
    DBAuthenStrategy,
    JwtAuthenService,
  ],
})
export class AppModule {}
