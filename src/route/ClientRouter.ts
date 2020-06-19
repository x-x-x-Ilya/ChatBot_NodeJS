import { ClientController } from '../controller/ClientController';
import { back, menu } from '../view/view';
const clientController = new ClientController();

export class ClientRouter {
  constructor(TelegramBot) {
    TelegramBot.onText(/Enter email address - for mailing/, function onEmail(msg) {
      TelegramBot.sendMessage(msg.chat.id, "Enter your email " + clientController.enterEmail(), back);
    });

  }
}
