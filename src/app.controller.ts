import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { BarberService } from './app.service';
import { bot } from './main';

//import {BarberService} from './service/BarberService';
//const barberService = new BarberService();

@Controller()
export class  BarberController{
  constructor(private readonly appService: BarberService) {}

  /*@Get()
  getHello(): string {
    return this.appService.getHello();
  }*/

  @Post()
  //Hello(@Req() request): string {
  Hello(@Body() body): string {
  bot.processUpdate(body);
    return this.appService.getHello(body);
  }
  @Get()
  async showBarberList() : Promise<string | boolean> {
    const barbers = await this.appService.showBarberList();
    if(barbers.length != 0) {
      let Response = '\r\n';
      for (let i = 0; i < barbers.length; i++) {
        Response += "[" + barbers[i].id + "] " + barbers[i].first_name + ' ';
        Response += barbers[i].last_name + '\r\n';
      }
      return Response;
    }
    return false;
  }
}
