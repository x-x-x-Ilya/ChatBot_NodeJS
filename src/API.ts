import { menu, back, help, appointment } from './keyboards/keyboards';
import { menuButtons, profileButtons } from './keyboards/key-board-buttons';
import {routes} from './route/routes';
import * as Bot from 'node-telegram-bot-api';

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
          await routes.barberRouter.BarberList(TelegramBot, msg);
          isCommand = true;
          break;

        case menuButtons.RemoveMyAppointment:
          await routes.appointmentRouter.RemoveMyAppointment(TelegramBot, msg);
          isCommand = true;
          break;

          case profileButtons.Appointments:
            TelegramBot.sendMessage(msg.chat.id, 'What kind of appointments you want?', appointment);
          isCommand = true;
          break;

        case menuButtons.PriceList:
          await routes.serviceRouter.PriceList(TelegramBot, msg);
          isCommand = true;
          break;

        case menuButtons.checkDateAppointment:
          await routes.appointmentRouter.checkDateAppointment(TelegramBot, msg);
          isCommand = true;
          break;

        case profileButtons.sendLastName:
          await routes.clientRouter.EnterLastName(TelegramBot, msg);
          isCommand = true;
          break;

        case menuButtons.SignUpForAnAppointment:
          await routes.appointmentRouter.SignUpForAnAppointment(TelegramBot, msg);
          isCommand = true;
          break;

        case profileButtons.sendEmail:
          await routes.clientRouter.EnterEmailAddress(TelegramBot, msg);
          isCommand = true;
          break;

        case menuButtons.Help:
          TelegramBot.sendMessage(msg.chat.id, 'help text', help);
          isCommand = true;
          break;

        case menuButtons.MyProfile:
          await routes.clientRouter.MyProfile(msg, TelegramBot);
          isCommand = true;
          break;

        case '/start':
          await routes.clientRouter.addClient(TelegramBot, msg);
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
        await routes.appointmentRouter.showMyAppointments(TelegramBot, query.message)
      }
      else if(query.data === 'appointmentsHistory'){
        await routes.appointmentRouter.AppointmentsHistory(TelegramBot, query.message);
      }
    })
  }
}