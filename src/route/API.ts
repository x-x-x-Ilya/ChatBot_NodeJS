import { menu, back, help } from '../keyboards/keyboards';
import { AppointmentRouter } from './AppointmentRouter';
import { ClientRouter } from './ClientRouter';
import { BarberRouter } from './BarberRouter';
import { ServiceRouter } from './ServiceRouter';

export class API {//{parse_mode: JSON/HTML}
  constructor(TelegramBot) {

      const servicesRouter = new ServiceRouter(TelegramBot);
      const appointmentRouter = new AppointmentRouter(TelegramBot);
      const clientRouter = new ClientRouter(TelegramBot);
      const barberRouter = new BarberRouter(TelegramBot);

      TelegramBot.onText(/\/start/, function(msg) {
        TelegramBot.sendMessage(msg.chat.id, 'Hello, ' + msg.chat.first_name + ', i am Barber Bot. Can i help you?', menu);

      });

      TelegramBot.onText(/Back/, function onBack(msg) {
        TelegramBot.sendMessage(msg.chat.id, 'menu:', menu);
      });

      TelegramBot.onText(/\/help/, function onBack(msg) {
        TelegramBot.sendMessage(msg.chat.id, 'not command!!!', help);
      });

    TelegramBot.on('message', msg => {  // первая версия обработчика, на случай если текст не являлся командой
      if(msg.text != "/help" && msg.text != "Back" && msg.text != "Barber list" && msg.text != "/start"){
        TelegramBot.sendMessage(msg.chat.id, 'Use /help to see my commands', help);
      }
    });
  }
}