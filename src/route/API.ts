import { menu, back, help } from '../keyboards/keyboards';
import { menuButtons } from '../keyboards/key-board-buttons';
import { AppointmentRouter } from './AppointmentRouter';
import { ClientRouter } from './ClientRouter';
import { BarberRouter } from './BarberRouter';
import { ServiceRouter } from './ServiceRouter';

export class API {      //{parse_mode: JSON/HTML}
  constructor(TelegramBot) {
    console.log("constructor started...");
    TelegramBot.on('message', async msg => {
      let isCommand = false;
      switch (msg.text) {

        case menuButtons.Back:
          TelegramBot.sendMessage(msg.chat.id, 'menu:', menu);
          isCommand = true;
          break;

          case menuButtons.BarberList:
          await BarberRouter.prototype.BarberList(TelegramBot, msg);
          isCommand = true;
          break;

          case menuButtons.ScheduledAppointments:
          await AppointmentRouter.prototype.showMyAppointments(TelegramBot, msg);
          isCommand = true;
          break;

        case menuButtons.AppointmentsHistory:
          await AppointmentRouter.prototype.AppointmentsHistory(TelegramBot, msg);
          isCommand = true;
          break;

        case menuButtons.PriceList:
          await ServiceRouter.prototype.PriceList(TelegramBot, msg);
          isCommand = true;
          break;

        case menuButtons.Help:
          TelegramBot.sendMessage(msg.chat.id, 'help text', help);
          isCommand = true;
          break;

        case menuButtons.EnterEmailAddress:
          await ClientRouter.prototype.EnterEmailAddress(TelegramBot, msg);
          isCommand = true;
          break;

        case menuButtons.Start:
          await ClientRouter.prototype.addClient(TelegramBot, msg);
          TelegramBot.sendMessage(msg.chat.id, 'Hello, ' + msg.chat.first_name + ', i am Barber Bot. Can i help you?', menu);
          isCommand = true;
          break;
      }

      if(!isCommand){
        TelegramBot.sendMessage(msg.chat.id, 'Use /help to see my commands', help);
      }
    });
  }
}