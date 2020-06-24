import { menu, back, help, appointment } from './keyboards/keyboards';
import { menuButtons } from './keyboards/key-board-buttons';
import { AppointmentRouter } from './route/AppointmentRouter';
import { ClientRouter } from './route/ClientRouter';
import { BarberRouter } from './route/BarberRouter';
import { ServiceRouter } from './route/ServiceRouter';
import * as Bot from 'node-telegram-bot-api';

const appointmentRouter = new AppointmentRouter();
const serviceRouter = new ServiceRouter();
const barberRouter = new BarberRouter();
const clientRouter = new ClientRouter();

export class API {
  constructor(TelegramBot : Bot) {

    TelegramBot.on('message', async msg => {
      let isCommand = false;  // если для сообщения есть команда то переменная станет true, если false вызывается /help

      switch (msg.text) {
        case menuButtons.Back:
          TelegramBot.sendMessage(msg.chat.id, 'Waiting for you command...', menu);
          isCommand = true;
          break;

          case menuButtons.BarberList:
          await barberRouter.BarberList(TelegramBot, msg);
          isCommand = true;
          break;

        case menuButtons.RemoveMyAppointment:
          await appointmentRouter.RemoveMyAppointment(TelegramBot, msg);
          isCommand = true;
          break;

          case menuButtons.Appointments:
            TelegramBot.sendMessage(msg.chat.id, 'What kind of appointments you want?', appointment);
          isCommand = true;
          break;

        case menuButtons.PriceList:
          await serviceRouter.PriceList(TelegramBot, msg);
          isCommand = true;
          break;

        case menuButtons.SignUpForAnAppointment:
          await appointmentRouter.SignUpForAnAppointment(TelegramBot, msg);
          isCommand = true;
          break;

        case menuButtons.Help:
          TelegramBot.sendMessage(msg.chat.id, 'help text', help);
          isCommand = true;
          break;

        case menuButtons.EnterEmailAddress:
          await clientRouter.EnterEmailAddress(TelegramBot, msg);
          isCommand = true;
          break;

        case menuButtons.Start:
          await clientRouter.addClient(TelegramBot, msg);
          TelegramBot.sendMessage(msg.chat.id, 'Hello, ' + msg.chat.first_name + ', i am Barber Bot. Can i help you?', menu);
          isCommand = true;
          break;
      }

      if(!isCommand){
        if(msg.text.indexOf('/\/date') != -1 && msg.text.indexOf('/\/email') != -1)
        TelegramBot.sendMessage(msg.chat.id, 'I do not understand you, please, try again', help);
      }

    });

    // для инлайн клавиатуры
    TelegramBot.on('callback_query', async query => {
      if(query.data === 'bookedAppointments'){
        await appointmentRouter.showMyAppointments(TelegramBot, query.message)
      }
      else if(query.data === 'appointmentsHistory'){
        await appointmentRouter.AppointmentsHistory(TelegramBot, query.message);
      }
    })
  }
}