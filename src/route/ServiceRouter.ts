import { menu, back } from '../view/view';
import { ServiceController } from '../controller/ServiceController';
const serviceController = new ServiceController();

export class ServiceRouter {
  constructor(TelegramBot) {

    TelegramBot.onText(/Price list/, async function (msg) {
      const r = serviceController.showPriceList();
      // how to send response
      TelegramBot.sendMessage(msg.chat.id, 'Price list: in console', back);
    });

    TelegramBot.onText(/Select price/, function (msg) {
      TelegramBot.sendMessage(msg.chat.id, 'Enter price id', back);
      TelegramBot.on('message', function (msg) {
        const r = serviceController.selectPrice(msg.text);
        TelegramBot.sendMessage(msg.chat.id, r, back);
      });
    });

  }
}
