import { menu, back } from '../view/view';
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