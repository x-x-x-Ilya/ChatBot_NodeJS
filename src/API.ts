import { menu, back, help, appointment, edit } from './keyboards/keyboards';
import { appointmentButtons, editButtons, menuButtons, profileButtons } from './keyboards/key-board-buttons';
import {routes} from './route/routes';
import * as Bot from 'node-telegram-bot-api';

function sendMessage(TelegramBot, msg, text, keyboard){
  TelegramBot.sendMessage(msg.chat.id, text, keyboard).catch((error) => {
    console.log(error.code);
    console.log(error.response.body);
  });
}

export class API {

  constructor(TelegramBot : Bot) {

    let last_name_message_id;
    let email_message_id;
    let check_date_message_id;
    let edit_appointment_message_id;
    let set_barber_message_id;
    let sign_up_for_appointment_message;
    let set_time_message_id;
    let set_service_msg_id;

    let isCommand = false;  // если для сообщения есть команда то переменная станет true, если false вызывается /help
    let isCreating = false; // если пытаемся создать запись в барбершопе true


    let date: Date;
    let barber;
    let cur_appointment = null;

    TelegramBot.on('message', async msg => {
      console.log(msg);
      isCommand = false;

      if(msg.message_id == last_name_message_id) {
        await routes.clientRouter.EnterLastName(TelegramBot, msg);
        isCommand = true;
      }
      else if(msg.message_id == check_date_message_id){
        await routes.appointmentRouter.freeDateAppointment(TelegramBot, msg);
        isCommand = true;
      }
      else if(msg.message_id == email_message_id){
        await routes.clientRouter.EnterEmailAddress(TelegramBot, msg);
        isCommand = true;
      }

      if(msg.message_id == set_barber_message_id){
        barber = await routes.barberRouter.SetBarber(TelegramBot, msg);
        if(isCreating) {
          await routes.serviceRouter.PriceList(TelegramBot, msg);
          set_service_msg_id = msg.message_id + 2;
          TelegramBot.sendMessage(msg.chat.id, 'Select id service you want', back);
        }
        if(!isCreating){
          cur_appointment.barber_id = barber.id;
          await routes.appointmentRouter.updateAppointment(cur_appointment);
        }
        isCommand = true;
      }


      else if(msg.message_id == sign_up_for_appointment_message){
        date = await routes.appointmentRouter.SetDate(TelegramBot, msg);
        if(isCreating) {
          set_time_message_id = msg.message_id + 2;
          TelegramBot.sendMessage(msg.chat.id, 'Enter time, you would like to visit us (format: "16:00")', back);
        }
        isCommand = true;
      }
      else if(msg.message_id == set_time_message_id){
        await routes.appointmentRouter.SetTime(TelegramBot, msg, date);
        if(isCreating) {
          await routes.barberRouter.BarberList(TelegramBot, msg);
          set_barber_message_id = msg.message_id + 2;
          TelegramBot.sendMessage(msg.chat.id, 'Enter barber id you want', back);
        }
        isCommand = true;
      }

      else if (msg.message_id == edit_appointment_message_id){
        cur_appointment = await routes.appointmentRouter.GetAppointment(msg, parseInt(msg.text, 10));
        if(cur_appointment != null)
          TelegramBot.sendMessage(msg.chat.id, 'Select operation', edit);
        else
          TelegramBot.sendMessage(msg.chat.id, 'Error, please try again...', back);
        isCommand = true;
      }
      else if(msg.message_id == set_service_msg_id){
          const service = await routes.serviceRouter.SetService(TelegramBot, msg);
        if(isCreating) {
          const res = await routes.appointmentRouter.setAppointment(TelegramBot, msg, date, barber, service);
          if (res == false)
            sendMessage(TelegramBot, msg, 'Sorry, somethings wrong, try again', menu);
          else {
            TelegramBot.sendMessage(msg.chat.id, 'Your appointment added:' + "[" + res.id + "]" + res.date + " " + res.service.name + " " + res.barber.first_name + " " + res.barber.last_name + '\r\n', menu);
          }
        }
        isCommand = true;
      }

      //buttons
      switch (msg.text) {

        case menuButtons.Back:
          sendMessage(TelegramBot, msg, 'Waiting for you command...', menu);
          isCommand = true;
          break;

        case editButtons.Delete:
          if(await routes.appointmentRouter.RemoveMyAppointment(TelegramBot, msg, cur_appointment.id))
            sendMessage(TelegramBot, msg, 'Appointment removed successfully.', back);
          else
            sendMessage(TelegramBot, msg, 'Operation error, please, try again.', back);
          isCommand = true;
          break;

        case menuButtons.BarberList:
          await routes.barberRouter.BarberList(TelegramBot, msg);
          isCommand = true;
          break;

        case profileButtons.Appointments:
          sendMessage(TelegramBot, msg, 'What kind of appointments you want?', appointment);
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


        case '/start':
          await routes.clientRouter.addClient(TelegramBot, msg);
          sendMessage(TelegramBot, msg, 'Hello, ' + msg.chat.first_name + ', i am Barber Bot. Can i help you?', menu);
          isCommand = true;
          break;

        case profileButtons.sendLastName:
          last_name_message_id = msg.message_id + 2;
          sendMessage(TelegramBot, msg, 'Enter your last_name', back);
          isCommand = true;
          break;

        case menuButtons.checkDateAppointment:
          check_date_message_id = msg.message_id + 2;
          sendMessage(TelegramBot, msg, 'Enter date you would like to visit us (format: "06.05.2020")', back);
          isCommand = true;
          break;

        case profileButtons.sendEmail:
          email_message_id = msg.message_id + 2;
          TelegramBot.sendMessage(msg.chat.id, 'Enter your email', back);
          isCommand = true;
          break;

        case appointmentButtons.Edit:
          edit_appointment_message_id = msg.message_id + 2;
          TelegramBot.sendMessage(msg.chat.id, 'Enter appointment id you would like to edit', back);
          isCommand = true;
          break;

        case menuButtons.Help:
          TelegramBot.sendMessage(msg.chat.id, 'help text', help);
          isCommand = true;
          break;

        case editButtons.ChangeTime:
          set_time_message_id = msg.message_id + 3;
          const obj_like_message = {text:cur_appointment.date.toString()}
          await routes.appointmentRouter.freeDateAppointment(TelegramBot, obj_like_message);
          TelegramBot.sendMessage(msg.chat.id, 'Enter time you want', back);
          isCommand = true;
          break;

        case editButtons.ChangeBarber:
          set_barber_message_id = msg.message_id + 3;
          await routes.barberRouter.BarberList(TelegramBot, msg);
          TelegramBot.sendMessage(msg.chat.id, 'Enter barber id you want', back);
          isCommand = true;
          break;

        case editButtons.ChangeService:
          set_service_msg_id = msg.message_id + 3;
          await routes.serviceRouter.PriceList(TelegramBot, msg);
          TelegramBot.sendMessage(msg.chat.id, 'Enter service id you want', back);
          isCommand = true;
          break;

        case menuButtons.SignUpForAnAppointment:
          isCreating = true;
          sign_up_for_appointment_message = msg.chat.id + 2;
          TelegramBot.sendMessage(msg.chat.id, 'Enter date you would like to visit us (format: "06.05.2020")', back);
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