import { BarberController } from '../controller/BarberController';
import { back, menu } from '../view/view';
const barberController = new BarberController();

export class BarberRouter {
  constructor(TelegramBot) {

    TelegramBot.onText(/Show barber list/, function (msg) {
      TelegramBot.sendMessage(msg.chat.id, 'Barber list:' +  barberController.showBarberList(), back);
    });

  }
}
