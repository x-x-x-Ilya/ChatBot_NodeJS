import { BarberController } from '../controller/BarberController';
import { back, menu } from '../view/view';
const barberController = new BarberController();

export class BarberRouter {
  constructor(TelegramBot) {
    TelegramBot.onText(/Show barber list/, async function (msg) {
      try {
        const r = await barberController.showBarberList();
      TelegramBot.sendMessage(msg.chat.id, 'Barber list:' + JSON.stringify(r), back);
      } catch (e) {
        console.log(e);
      }
    });

  }
}
