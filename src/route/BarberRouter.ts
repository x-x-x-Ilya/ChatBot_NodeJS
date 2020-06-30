import { menu, back } from '../keyboards/keyboards';
import { BarberController } from '../controller/BarberController';
import {routes} from './routes';

const barberController = new BarberController();

export class BarberRouter {
  async BarberList(TelegramBot : any, msg : any) : Promise<void>{
    const list = await barberController.showBarberList();
    if(list != false)
    TelegramBot.sendMessage(msg.chat.id, 'Barber list:' + list, menu);
    else
      TelegramBot.sendMessage(msg.chat.id, 'Somethings wrong, please try again later...', menu);
  }

  async SetBarber(TelegramBot :any, msg : any) : Promise<any>{
    const barber = await barberController.selectBarber(msg.text.substring(8, msg.text.length));
    TelegramBot.sendMessage(msg.chat.id, 'Your Barber: ' + barber.first_name + " " + barber.last_name, back);
    await routes.serviceRouter.PriceList(TelegramBot, msg);
    TelegramBot.sendMessage(msg.chat.id, 'Select id service you want (format: "/service 4586")', back);
    return barber;
  }
}