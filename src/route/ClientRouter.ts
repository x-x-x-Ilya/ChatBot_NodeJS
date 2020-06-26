import { menu, back, profile } from '../keyboards/keyboards';
import { ClientController } from '../controller/ClientController';
const clientController = new ClientController();

export class ClientRouter {

  async addClient(TelegramBot, msg) {
    await clientController.addClient(msg.chat.id, msg.chat.first_name, msg.chat.last_name);
  }

  async MyProfile(msg, TelegramBot) {
    TelegramBot.sendMessage(msg.chat.id, await clientController.MyProfile(msg.chat.id), profile);
  }

  async EnterLastName(TelegramBot, msg) {
      await clientController.enterLastName(msg.text.substring(11, msg.text.length), msg.chat.id);
  }

  async EnterEmailAddress(TelegramBot, msg) {
    await clientController.enterEmail(msg.text.substring(7, msg.length), msg.chat.id);
    TelegramBot.sendMessage(msg.chat.id, "your email added to our client base", profile);
  }

}

