import { AppController } from '../controller/app.controller';
import { back, menu } from '../view/view';
const appController = new AppController();

export class API {
  constructor(TelegramBot) {

    TelegramBot.onText(/\/start/, function (msg) {
      TelegramBot.sendMessage(msg.chat.id, 'Hello, ' + msg.chat.first_name + ', i am Barber Bot. Can i help you?', menu);
    });

    TelegramBot.onText(/Sign up for a service/, function (msg) {
      TelegramBot.sendMessage(msg.chat.id, appController.setService(), back);
    });

    TelegramBot.onText(/Show price list/, function (msg) {
      TelegramBot.sendMessage(msg.chat.id, 'Price list:' + appController.showPriceList(), back);
    });

    TelegramBot.onText(/Enter email address - for mailing/, function onEmail(msg) {
      TelegramBot.sendMessage(msg.chat.id, "Enter your email " + appController.enterEmail(), back);
    });

    TelegramBot.onText(/Back/, function onBack(msg) {
      TelegramBot.sendMessage(msg.chat.id,'menu:', menu);
    });

  }
}