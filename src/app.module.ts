import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from 'controllers/app.controller';
import { AccountController } from 'controllers/account.controller';

import { AccountService } from 'services/account.service';

import { Members } from 'entity/members.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([Members]),
  ],
  controllers: [
    AppController,
    AccountController,
  ],
  providers: [AccountService],
})
export class AppModule {}
