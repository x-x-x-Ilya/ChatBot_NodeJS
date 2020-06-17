import { Controller, Get } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { bot } from '../main';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


}
