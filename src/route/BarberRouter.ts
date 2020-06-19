import { BarberController } from '../controller/BarberController';
import { back, menu } from '../view/view';
const barberController = new BarberController();

export class BarberRouter {
  constructor(TelegramBot) {

    TelegramBot.onText(/Show barber list/, async function (msg) {
      try {
        const r = await barberController.showBarberList();
      const R = JSON.parse(r);
      console.log(R);
      TelegramBot.sendMessage(msg.chat.id, 'Barber list:' + R, back);
      } catch (e) {
        console.log(e);
      }
    });

  }
}
