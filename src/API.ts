import { menu, back, help, appointment } from './keyboards/keyboards';
import { menuButtons, profileButtons } from './keyboards/key-board-buttons';
import {routes} from './route/routes';
import * as Bot from 'node-telegram-bot-api';

export class API {

  constructor(TelegramBot : Bot) {
    let isCommand = false;  // если для сообщения есть команда то переменная станет true, если false вызывается /help

    TelegramBot.on('message', async msg => {
      isCommand = false;

      //commands
      if(msg.text.indexOf('/check')!= -1) {
        await routes.appointmentRouter.checkDateAppointment(TelegramBot, msg);
        isCommand = true;
      }
      else if(msg.text.indexOf('/date')!= -1) {
        await routes.appointmentRouter.SignUpForAnAppointment(TelegramBot, msg);
        isCommand = true;
      }
      else if(msg.text.indexOf('/email')!= -1) {
        await routes.clientRouter.EnterEmailAddress(TelegramBot, msg);
        isCommand = true;
      }
      else if(msg.text.indexOf('/last_name')!= -1) {
        await routes.clientRouter.EnterLastName(TelegramBot, msg);
        isCommand = true;
      }

      //buttons
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
          TelegramBot.sendMessage(msg.chat.id, 'Enter date you would like to visit us (format: "/check 06.05.2020")');
          isCommand = true;
          break;

        case profileButtons.sendLastName:
          TelegramBot.sendMessage(msg.chat.id, 'Enter your last_name ("/last_name some-last_name")', back);
          isCommand = true;
          break;

        case menuButtons.SignUpForAnAppointment:
          TelegramBot.sendMessage(msg.chat.id, 'Enter date you would like to visit us (format: "/date 06.05.2020")', back);
          isCommand = true;
          break;

        case profileButtons.sendEmail:
          TelegramBot.sendMessage(msg.chat.id, 'Enter your email ("/email examplmail@mail.com")', back);
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

    //inline keyboards
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