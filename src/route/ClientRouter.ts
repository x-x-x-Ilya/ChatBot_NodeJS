import { menu, back } from '../view/view';
import { ClientController } from '../controller/ClientController';
const clientController = new ClientController();

export class ClientRouter {
  constructor(TelegramBot) {

    TelegramBot.onText(/\/start/, function (msg) {
       clientController.addClient(msg.chat.id, msg.chat.first_name);
    });

    TelegramBot.onText(/Enter email address/, function (msg) {
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
        TelegramBot.on('message', async function (msg) {  // после первого выполнения продолжает использоваться
        try {
          await clientController.enterEmail(msg.text, msg.chat.id, msg.chat.first_name);
          TelegramBot.sendMessage(msg.chat.id,"your email added to our client base", back);
        } catch (e) {
          console.log(e);
        }
      });

    });


  }
}
