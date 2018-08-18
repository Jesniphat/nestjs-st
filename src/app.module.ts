import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from 'controllers/app.controller';
import { AppService } from 'services/app.service';

import { Members } from 'entity/members.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([Members]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
