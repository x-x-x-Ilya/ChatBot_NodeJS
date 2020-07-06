import { menu, back, profile } from '../keyboards/keyboards';
import { ClientController } from '../controller/ClientController';
const clientController = new ClientController();

export class ClientRouter {
  async addClient(TelegramBot: any, msg: any): Promise<void> {
    await clientController.addClient(
      msg.chat.id,
      msg.chat.first_name,
      msg.chat.last_name,
    );
  }

  async MyProfile(msg: any, TelegramBot: any): Promise<void> {
    TelegramBot.sendMessage(
      msg.chat.id,
      await clientController.MyProfile(msg.chat.id),
      profile,
    );
  }

  async EnterLastName(TelegramBot: any, msg: any): Promise<void> {
    TelegramBot.sendMessage(
      msg.chat.id,
      await clientController.enterLastName(
        /*msg.text.substring(11, msg.text.length)*/ msg.text,
        msg.chat.id,
      ),
      profile,
    );
  }

  async EnterEmailAddress(TelegramBot: any, msg: any): Promise<void> {
    await clientController.enterEmail(msg.text, msg.chat.id);
    TelegramBot.sendMessage(
      msg.chat.id,
      'your email added to our client base',
      profile,
    );
  }
}
