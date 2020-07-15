import { Injectable } from '@nestjs/common';
import { ServiceController } from '../controller/ServiceController';
const serviceController = new ServiceController();

@Injectable()
export class ServiceRouter {
  async List(): Promise<string | boolean> {
    const list = await serviceController.showPriceList();
    if (list != false)
      return list;
    else
      return 'Somethings wrong, please, try again later...';
  }

  async SetService(TelegramBot: any, msg: any): Promise<any> {
    return await serviceController.SetService(msg.text);
  }
}
