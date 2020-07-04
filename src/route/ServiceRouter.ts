import { menu, back } from '../keyboards/keyboards';
import { ServiceController } from '../controller/ServiceController';
const serviceController = new ServiceController();

export class ServiceRouter {

  async PriceList(TelegramBot : any, msg :any) : Promise<void>{
    const list = await serviceController.showPriceList();
    if(list != false)
    TelegramBot.sendMessage(msg.chat.id, 'Price list:' + list, menu);
    else
      TelegramBot.sendMessage(msg.chat.id, 'Somethings wrong, please, try again later...', menu);
  }

  async SetService(TelegramBot : any, msg : any) : Promise<any>{
      return await serviceController.SetService(msg.text);
  }
}