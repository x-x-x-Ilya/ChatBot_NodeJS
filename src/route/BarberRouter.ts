import { menu, back } from '../keyboards/keyboards';
import { BarberController } from '../controller/BarberController';
const barberController = new BarberController();

export class BarberRouter {
  constructor(TelegramBot) {

    TelegramBot.onText(/Barber list/, async function (msg) {
      try {
        const r = await barberController.showBarberList();
      TelegramBot.sendMessage(msg.chat.id, 'Barber list:' + r, back);
      } catch (e) {
        console.log(e);
      }
    });

    TelegramBot.onText(/Select barber/, async function (msg) {
      TelegramBot.sendMessage(msg.chat.id, 'Enter barber id', back);
        TelegramBot.on('message', function (msg) {
          const r = barberController.selectBarber();
          TelegramBot.sendMessage(msg.chat.id, 'Your Barber:' + JSON.stringify(r), back);
        });
    });
  }
}
