import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Controller } from './.controller';
import { Service } from './.service';

@Module({
  imports: [],
  controllers: [AppController, Controller],
  providers: [AppService, Service],
})
export class AppModule {}
