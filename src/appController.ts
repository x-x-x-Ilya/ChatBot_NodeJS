import { Body, Controller, Post } from '@nestjs/common';
import { bot } from './main';

@Controller()
export class  appController{
  @Post()
  async onMessage(@Body() body) {
    bot.processUpdate(body);
  }
}
