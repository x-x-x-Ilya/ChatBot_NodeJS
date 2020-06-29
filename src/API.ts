import { menu, back, help, appointment, edit } from './keyboards/keyboards';
import { appointmentButtons, editButtons, menuButtons, profileButtons } from './keyboards/key-board-buttons';
import {routes} from './route/routes';
import * as Bot from 'node-telegram-bot-api';

/*
bot.sendMessage(nonExistentUserId, 'text').catch((error) => {
  console.log(error.code);  // => 'ETELEGRAM'
  console.log(error.response.body); // => { ok: false, error_code: 400, description: 'Bad Request: chat not found' }
});*/

/*
bot.on('polling_error', (error) => {
  console.log(error.code);  // => 'EFATAL'
});
 */

export class API {

  constructor(TelegramBot : Bot) {

    let isCommand = false;  // если для сообщения есть команда то переменная станет true, если false вызывается /help
    let date: Date;
    let barber;
    let cur_appointment = null;
    TelegramBot.on('message', async msg => {
      isCommand = false;

      //commands
      if(msg.text.indexOf('/check')!= -1) {
        await routes.appointmentRouter.freeDateAppointment(TelegramBot, msg);
        isCommand = true;
      }
      else if(msg.text.indexOf('/date')!= -1) {
        date = await routes.appointmentRouter.SetDate(TelegramBot, msg);
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
      else if(msg.text.indexOf('/time') != -1){
        await routes.appointmentRouter.SetTime(TelegramBot, msg, date);
        isCommand = true;
      }
      else if(msg.text.indexOf('/barber') != -1){
        barber = await routes.barberRouter.SetBarber(TelegramBot, msg);

        isCommand = true;
      }
      else if(msg.text.indexOf('/service') != -1){
          const service = await routes.serviceRouter.SetService(TelegramBot, msg);
          const res = await routes.appointmentRouter.setAppointment(TelegramBot, msg, date, barber, service);
          if(res == false)
            TelegramBot.sendMessage(msg.chat.id, 'Sorry, somethings wrong, try again', menu);
          else {
            TelegramBot.sendMessage(msg.chat.id, 'Your appointment added:' + "[" + res.id + "]" + res.date + " " + res.service.name + " " + res.barber.first_name + " " + res.barber.last_name + '\r\n', menu);
          }
        isCommand = true;
      }
      else if(msg.text.indexOf('/id') != -1) {
        cur_appointment = await routes.appointmentRouter.GetAppointment(msg, parseInt(msg.text.substring(4, msg.text.length), 10));
        if(cur_appointment != null)
          TelegramBot.sendMessage(msg.chat.id, 'Select operation', edit);
        else
          TelegramBot.sendMessage(msg.chat.id, 'Error, please try again...', back);
        isCommand = true;
      }

      //buttons
      switch (msg.text) {

        case menuButtons.Back:
          TelegramBot.sendMessage(msg.chat.id, 'Waiting for you command...', menu);
          isCommand = true;
          break;

        case editButtons.Delete:
          if(await routes.appointmentRouter.RemoveMyAppointment(TelegramBot, msg, cur_appointment.id))
          TelegramBot.sendMessage(msg.chat.id, 'Appointment removed successfully.', back);
          else
            TelegramBot.sendMessage(msg.chat.id, 'Operation error, please, try again.', back);
          isCommand = true;
          break;

        case menuButtons.BarberList:
          await routes.barberRouter.BarberList(TelegramBot, msg);
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


        case menuButtons.MyProfile:
          await routes.clientRouter.MyProfile(msg, TelegramBot);
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


        case appointmentButtons.Edit:
          TelegramBot.sendMessage(msg.chat.id, 'Enter appointment you would like to edit (format: "/id 75675")', back);
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



          case editButtons.ChangeBarber:
          await routes.barberRouter.BarberList(TelegramBot, msg);
          TelegramBot.sendMessage(msg.chat.id, 'Enter barber id you want (format: "/barber 81558452")', back);
          isCommand = true;
          break;

        case '/start':
          await routes.clientRouter.addClient(TelegramBot, msg);
          TelegramBot.sendMessage(msg.chat.id, 'Hello, ' + msg.chat.first_name + ', i am Barber Bot. Can i help you?', menu);
          isCommand = true;
          break;
      }



      if(!isCommand)
        TelegramBot.sendMessage(msg.chat.id, 'I do not understand you, please, try again', help);


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