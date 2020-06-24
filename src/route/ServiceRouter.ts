import { menu, back } from '../keyboards/keyboards';
import { ServiceController } from '../controller/ServiceController';
const serviceController = new ServiceController();

export class ServiceRouter {


  async PriceList(TelegramBot, msg) {
    TelegramBot.sendMessage(msg.chat.id, 'Price list:' + await serviceController.showPriceList(), back);
  }
}

/*  constructor(TelegramBot) {

    TelegramBot.onText(/Select price/, function (msg) {
      TelegramBot.sendMessage(msg.chat.id, 'Enter price id', back);
      TelegramBot.on('message', async function (msg) {
        await serviceController.selectPrice(msg.text);
        // how to send response
        TelegramBot.sendMessage(msg.chat.id, 'Price info: in console', back);
      });
    });
  }*/

