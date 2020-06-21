import { menu, back } from '../keyboards/keyboards';
import { ClientController } from '../controller/ClientController';
const clientController = new ClientController();

export class ClientRouter {

  async addClient(TelegramBot, msg) {
    await clientController.addClient(msg.chat.id, msg.chat.first_name);
  }

  async EnterEmailAddress(TelegramBot, msg) {
    const back = {
      reply_markup: JSON.stringify({
        resize_keyboard: true,
        remove_keyboard: true,
        keyboard: [
          ['Back']
        ]
      })
    };
    TelegramBot.sendMessage(msg.chat.id, "Enter your email", back);
    TelegramBot.on('message', async function(msg) { // после первого выполнения продолжает использоваться
      await clientController.enterEmail(msg.text, msg.chat.id, msg.chat.first_name);
      TelegramBot.sendMessage(msg.chat.id, "your email added to our client base", back);
    });
  }

}

