import { menu, back } from '../keyboards/keyboards';
import { ServiceController } from '../controller/ServiceController';
const serviceController = new ServiceController();

export class ServiceRouter {

  async PriceList(TelegramBot, msg) : Promise<void>{
    const list = await serviceController.showPriceList();
    if(list != false)
    TelegramBot.sendMessage(msg.chat.id, 'Price list:' + list, menu);
    else
      TelegramBot.sendMessage(msg.chat.id, 'Somethings wrong, please, try again later...', menu);
  }

  async SetService(TelegramBot, msg) {
      return await serviceController.SetService(msg.text.substring(9, msg.text.length));
  }
}