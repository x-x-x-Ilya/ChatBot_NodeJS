import { menu, back } from '../keyboards/keyboards';
import { ServiceController } from '../controller/ServiceController';
const serviceController = new ServiceController();

export class ServiceRouter {
  constructor(TelegramBot) {

    TelegramBot.onText(/Price list/, async function (msg) {
      const r = await serviceController.showPriceList();
      // how to send response
      TelegramBot.sendMessage(msg.chat.id, 'Price list:' + r, back);
    });

    TelegramBot.onText(/Select price/, function (msg) {
      TelegramBot.sendMessage(msg.chat.id, 'Enter price id', back);
      TelegramBot.on('message', async function (msg) {
        await serviceController.selectPrice(msg.text);
        // how to send response
        TelegramBot.sendMessage(msg.chat.id, 'Price info: in console', back);
      });
    });

  }
}
