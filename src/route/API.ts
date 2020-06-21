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

        case menuButtons.Start:
          TelegramBot.sendMessage(msg.chat.id, 'Hello, ' + msg.chat.first_name + ', i am Barber Bot. Can i help you?', menu);
          isCommand = true;
          break;

        case menuButtons.BarberList:
          await BarberRouter.prototype.BarberList(TelegramBot, msg);
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

        case menuButtons.Back:
            TelegramBot.sendMessage(msg.chat.id, 'menu:', menu);
          isCommand = true;
          break;
      }
      if(!isCommand){
        TelegramBot.sendMessage(msg.chat.id, 'Use /help to see my commands', help);
      }
    });
      const servicesRouter = new ServiceRouter(TelegramBot);
      const appointmentRouter = new AppointmentRouter(TelegramBot);
      const clientRouter = new ClientRouter(TelegramBot);
      const barberRouter = new BarberRouter(TelegramBot);

    /*TelegramBot.on('message', msg => {  // первая версия обработчика, на случай если текст не являлся командой
      if(msg.text != "/help" && msg.text != "Back" && msg.text != "Barber list" && msg.text != "/start"){
        TelegramBot.sendMessage(msg.chat.id, 'Use /help to see my commands', help);
      }
    });*/
  }
}