import { Body, Controller, Post } from '@nestjs/common';
import { bot } from './main';
import { menu, back, help, appointment, edit, profile } from './keyboards/keyboards';
import * as fs from 'fs';
import {
  appointmentButtons,
  editButtons,
  menuButtons,
  profileButtons,
} from './keyboards/key-board-buttons';
import { AppointmentRouter } from './route/AppointmentRouter';
import { BarberRouter } from './route/BarberRouter';
import { ClientRouter } from './route/ClientRouter';
import { ServiceRouter } from './route/ServiceRouter';

const appointmentRouter = new AppointmentRouter();
const barberRouter = new BarberRouter();
const clientRouter = new ClientRouter();
const serviceRouter = new ServiceRouter();

function sendMessage(TelegramBot, msg, text, keyboard) {    // убрать в хелперы

  fs.appendFileSync(`./logs/` + msg.chat.id + `.txt`, '\n bot: ' + JSON.stringify(text, null, '\t') + ' ' + new Date());
  TelegramBot.sendMessage(msg.chat.id, text, keyboard).catch(error => {
    fs.appendFileSync(`./logs/_errors.txt`,JSON.stringify(error, null, '\t') + ' ' + new Date());
    console.log(error.code);
    console.log(error.response.body);
  });
}

/*
 *  Telegram отправляет HTTPS POST-запрос на указанный URL-адрес включаяя токен бота,
 *  содержащий JSON-сериализованное обновление.
 */

@Controller('bot' + process.env.TOKEN)
export class appController {

  @Post()
  async onMessage(@Body() update) : Promise<void>{
    console.log(update);
    fs.appendFileSync('./logs/' + update.message.chat.id + '.txt', '\n user: ' + JSON.stringify( update.message.text, null, '\t') + ' ' + new Date());

    let edit_appointment_message_id = null;
    let set_barber_message_id = null;
    let sign_up_for_appointment_message = null;
    let set_time_message_id = null;
    let set_service_msg_id = null;

    let isCommand = false; // если для сообщения есть команда то переменная станет true, если false вызывается /help
    let isCreating = false; // если пытаемся создать запись в барбершопе true

    let date: Date;
    let barber;
    let cur_appointment = null;

    isCommand = false;

    if(update.message.text.indexOf('/l') != -1){
        sendMessage(bot, update.message, await clientRouter.EnterLastName(update.message.text.substring(3), update.message.chat.id), profile);
        isCommand = true;
    }
    else if(update.message.text.indexOf('/m') != -1) {
      sendMessage(bot, update.message, await clientRouter.EnterEmailAddress(update.message.text.substring(3)), profile);
      isCommand = true;
    }
    else if (update.message.text.indexOf('/check') != -1) {
      sendMessage(bot, update.message, await appointmentRouter.freeDateAppointment(update.message.text.substring(7)), menu);
      isCommand = true;
    }
    else if (update.message.message_id == set_barber_message_id) {
      barber = await barberRouter.SetBarber(bot, update.message);
      if (isCreating) {
        await serviceRouter.PriceList(bot, update.message);
        set_service_msg_id = update.message.message_id + 2;
        bot.sendMessage(
          update.message.chat.id,
          'Select id service you want',
          back,
        );
      }
      if (!isCreating) {
        cur_appointment.barber_id = barber.id;
        await appointmentRouter.updateAppointment(cur_appointment);
      }
      isCommand = true;
    } else if (update.message.message_id == sign_up_for_appointment_message) {
      date = await appointmentRouter.SetDate(bot, update.message);
      if (isCreating) {
        set_time_message_id = update.message.message_id + 2;
        bot.sendMessage(
          update.message.chat.id,
          'Enter time, you would like to visit us (format: "16:00")',
          back,
        );
      }
      isCommand = true;
    } else if (update.message.message_id == set_time_message_id) {
      await appointmentRouter.SetTime(bot, update.message, date);
      if (isCreating) {
        await barberRouter.BarberList(bot, update.message);
        set_barber_message_id = update.message.message_id + 2;
        bot.sendMessage(
          update.message.chat.id,
          'Enter barber id you want',
          back,
        );
      }
      isCommand = true;
    } else if (update.message.message_id == edit_appointment_message_id) {
      cur_appointment = await appointmentRouter.GetAppointment(
        update.message,
        parseInt(update.message.text, 10),
      );
      if (cur_appointment != null)
        bot.sendMessage(update.message.chat.id, 'Select operation', edit);
      else
        bot.sendMessage(
          update.message.chat.id,
          'Error, please try again...',
          back,
        );
      isCommand = true;
    } else if (update.message.message_id == set_service_msg_id) {
      const service = await serviceRouter.SetService(bot, update.message);
      if (isCreating) {
        const res = await appointmentRouter.setAppointment(
          bot, update.message, date, barber, service);
        if (res == false)
          sendMessage(bot, update.message, 'Sorry, somethings wrong, try again', menu,);
        else {
          bot.sendMessage(update.message.chat.id,
            'Your appointment added: [' + res.id + ']' +
            res.date + ' ' +
            res.service.name + ' ' +
            res.barber.first_name + ' ' +
            res.barber.last_name + '\r\n', menu,);
        }
      }
      isCommand = true;
    }

    //buttons
    switch (update.message.text) {
      case menuButtons.Back:
        sendMessage(bot, update.message, 'Waiting for you command...', menu);
        isCommand = true;
        break;

      case editButtons.Delete:
        if (await appointmentRouter.RemoveMyAppointment(bot, update.message, cur_appointment.id))
          sendMessage(bot, update.message, 'Appointment removed successfully.', back);
        else
          sendMessage(bot, update.message,'Operation error, please, try again.', back);
        isCommand = true;
        break;

      case menuButtons.BarberList:
        await barberRouter.BarberList(bot, update.message);
        isCommand = true;
        break;

      case profileButtons.Appointments:
        sendMessage(
          bot,
          update.message,
          'What kind of appointments you want?',
          appointment,
        );
        isCommand = true;
        break;

      case menuButtons.PriceList:
        await serviceRouter.PriceList(bot, update.message);
        isCommand = true;
        break;

      case menuButtons.MyProfile:
        const response = await clientRouter.MyProfile(update.message);
        sendMessage(bot, update.message, response, profile);
        isCommand = true;
        break;

      case '/start':
        await clientRouter.addClient(bot, update.message);
        sendMessage(
          bot,
          update.message,
          'Hello, ' +
          update.message.chat.first_name +
          ', i am Barber Bot. Can i help you?',
          menu,
        );
        isCommand = true;
        break;

      case appointmentButtons.Edit:
        edit_appointment_message_id = update.message.message_id + 2;
        bot.sendMessage(
          update.message.chat.id,
          'Enter appointment id you would like to edit',
          back,
        );
        isCommand = true;
        break;

      case menuButtons.Help:
        bot.sendMessage(update.message.chat.id, 'help text', help);
        isCommand = true;
        break;

      case editButtons.ChangeTime:
        //set_time_message_id = update.message.message_id + 3;
        //const obj_like_message = { text: cur_appointment.date.toString() };
        //await appointmentRouter.freeDateAppointment(bot, obj_like_message);
        bot.sendMessage(update.message.chat.id, 'no code now(', back);
        isCommand = true;
        break;

      case editButtons.ChangeBarber:
        set_barber_message_id = update.message.message_id + 3;
        await barberRouter.BarberList(bot, update.message);
        bot.sendMessage(
          update.message.chat.id,
          'Enter barber id you want',
          back,
        );
        isCommand = true;
        break;

      case editButtons.ChangeService:
        set_service_msg_id = update.message.message_id + 3;
        await serviceRouter.PriceList(bot, update.message);
        bot.sendMessage(
          update.message.chat.id,
          'Enter service id you want',
          back,
        );
        isCommand = true;
        break;

      case menuButtons.SignUpForAnAppointment:
        isCreating = true;
        sign_up_for_appointment_message = update.message.chat.id + 2;
        bot.sendMessage(
          update.message.chat.id,
          'Enter date you would like to visit us (format: "06.05.2020")',
          back,
        );
        isCommand = true;
        break;
    }

    if (!isCommand)
      bot.sendMessage(
        update.message.chat.id,
        'I do not understand you, please, try again',
        help,
      );
    //inline keyboards
    bot.on('callback_query', async query => {
      if (query.data === 'bookedAppointments') {
        await appointmentRouter.showMyAppointments(
          bot,
          query.message,
        );
      } else if (query.data === 'appointmentsHistory') {
        await appointmentRouter.AppointmentsHistory(
          bot,
          query.message,
        );
      }
    });
  }
}