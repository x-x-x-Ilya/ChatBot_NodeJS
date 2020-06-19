import { menu, back } from '../view/view';
import { ClientController } from '../controller/ClientController';
const clientController = new ClientController();

export class ClientRouter {
  constructor(TelegramBot) {


    TelegramBot.onText(/Enter email address - for mailing/, function (msg) {
      TelegramBot.sendMessage(msg.chat.id, "Enter your email", back);
      TelegramBot.on('message', function (msg) {
        try {
          console.log(msg);

          clientController.enterEmail(msg.text, msg.chat.id, msg.chat.first_name);
        } catch (e) {
          console.log(e);
        }
        TelegramBot.sendMessage(msg.chat.id,"your email added to our client base", back);
      });

    });

  }
}
