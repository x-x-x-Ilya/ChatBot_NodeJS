import { menu, back } from '../keyboards/keyboards';
import { BarberController } from '../controller/BarberController';
const barberController = new BarberController();

export class BarberRouter {

  async BarberList(TelegramBot, msg) {
    //const r = await barberController.showBarberList();
    TelegramBot.sendMessage(msg.chat.id, 'Barber list:' + await barberController.showBarberList(), menu);
  }

/*
  constructor(TelegramBot) {

    TelegramBot.onText(/Select barber/, async function (msg) {
      TelegramBot.sendMessage(msg.chat.id, 'Enter barber id', back);
        TelegramBot.on('message', function (msg) {
          const r = barberController.selectBarber();
          TelegramBot.sendMessage(msg.chat.id, 'Your Barber:' + JSON.stringify(r), back);
        });
    });
  }*/
}
