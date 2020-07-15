import { Injectable } from '@nestjs/common';
import { ClientController } from '../controller/ClientController';
const clientController = new ClientController();

@Injectable()
export class ClientRouter {

  async addClient(TelegramBot: any, msg: any): Promise<void> {
    await clientController.addClient(
      msg.chat.id,
      msg.chat.first_name,
      msg.chat.last_name,
    );
  }

  async Profile(msg: any) {
    return await clientController.MyProfile(msg.chat.id);
  }

  async SetLastName(text, id) {
      return await clientController.enterLastName(text, id);
  }

  async SetEmail(msg: any): Promise<void> {
    return await clientController.enterEmail(msg.text, msg.chat.id);
  }
}
