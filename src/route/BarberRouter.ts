import { Injectable } from '@nestjs/common';
import { BarberController } from '../controller/BarberController';

const barberController = new BarberController();

@Injectable()
export class BarberRouter {

  async List(): Promise<string | boolean> {
    const list = await barberController.showBarberList();
    if (list != false)
      return list;
    else
      return 'Somethings wrong, please try again later...';
  }

  /*async SetBarber(TelegramBot: any, msg: any): Promise<any> {
    const barber = await barberController.selectBarber(msg.text);
    TelegramBot.sendMessage(
      msg.chat.id,
      'Your Barber: ' + barber.first_name + ' ' + barber.last_name,
      back,
    );
    return barber;
  }*/
}
