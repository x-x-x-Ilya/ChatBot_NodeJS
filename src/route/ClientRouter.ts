import { menu, back, profile } from '../keyboards/keyboards';
import { ClientController } from '../controller/ClientController';
const clientController = new ClientController();

export class ClientRouter {

  async addClient(TelegramBot, msg) {
    await clientController.addClient(msg.chat.id, msg.chat.first_name, msg.chat.last_name);
  }

  async MyProfile(TelegramBot, msg) {
    TelegramBot.sendMessage(msg.chat.id, clientController.MyProfile(msg.chat.id), profile);

    TelegramBot.onText(/\/email (.+)/, async (msg) => {
      await clientController.enterEmail(msg.text, msg.chat.id, msg.chat.first_name, msg.chat.last_name);
      TelegramBot.sendMessage(msg.chat.id, "your email added to our client base", back);
    });
  }

  async EnterEmailAddress(TelegramBot, msg) {
    TelegramBot.sendMessage(msg.chat.id, 'Enter your email ("/email examplmail@mail.com")', back);
      TelegramBot.onText(/\/email (.+)/, async (msg) => {
      await clientController.enterEmail(msg.text, msg.chat.id, msg.chat.first_name, msg.chat.last_name);
      TelegramBot.sendMessage(msg.chat.id, "your email added to our client base", back);
    });
  }

}

