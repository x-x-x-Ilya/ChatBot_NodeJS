import { back, menu } from '../view/view';
import { AppointmentRouter } from './AppointmentRouter';
import { ClientRouter } from './ClientRouter';
import { BarberRouter } from './BarberRouter';
import { ServiceRouter } from './ServiceRouter';


export class API {
  constructor(TelegramBot) {
    const servicesRouter = new ServiceRouter(TelegramBot);
    const appointmentRouter = new AppointmentRouter(TelegramBot);
    const clientRouter = new ClientRouter(TelegramBot);
    const barberRouter = new BarberRouter(TelegramBot);

    TelegramBot.onText(/\/start/, function (msg) {
      TelegramBot.sendMessage(msg.chat.id, 'Hello, ' + msg.chat.first_name + ', i am Barber Bot. Can i help you?', menu);
    });

    TelegramBot.onText(/Back/, function onBack(msg) {
      TelegramBot.sendMessage(msg.chat.id,'menu:', menu);
    });

  }
}

/*
// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});
*/

/*
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Hello World!!!');
});
 */