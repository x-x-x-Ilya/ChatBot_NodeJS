import { ServiceController } from '../controller/ServiceController';
import { back, menu } from '../view/view';
const serviceController = new ServiceController();

export class ServiceRouter {
  constructor(TelegramBot) {

    TelegramBot.onText(/Show price list/, function (msg) {
      TelegramBot.sendMessage(msg.chat.id, 'Price list:' + serviceController.showPriceList(), back);
    });

  }
}
