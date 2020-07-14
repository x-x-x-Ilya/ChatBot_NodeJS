import { Body, Controller, Post } from '@nestjs/common';
import { bot } from './main';
import { menu, back, help, appointment, edit } from './keyboards/keyboards';
import {
  appointmentButtons,
  editButtons,
  menuButtons,
  profileButtons,
} from './keyboards/key-board-buttons';
import { routes } from './route/routes';


function sendMessage(TelegramBot, msg, text, keyboard) {    // убрать в хелперы
  TelegramBot.sendMessage(msg.chat.id, text, keyboard).catch(error => {
    console.log(error.code);
    console.log(error.response.body);
  });
}

/*
 *  Telegram отправляет HTTPS POST-запрос на указанный URL-адрес,
 *  содержащий JSON-сериализованное обновление и токен бота.
 */
@Controller(process.env.TOKEN)  // POST barber-shop-b2a01.web.app/{Token}
export class appController {


  @Post()
  async onMessage(@Body() update) {
    console.log(update);  // доделать в полноценное логирование

    let last_name_message_id;
    let email_message_id;
    let check_date_message_id;
    let edit_appointment_message_id;
    let set_barber_message_id;
    let sign_up_for_appointment_message;
    let set_time_message_id;
    let set_service_msg_id;

    let isCommand = false; // если для сообщения есть команда то переменная станет true, если false вызывается /help
    let isCreating = false; // если пытаемся создать запись в барбершопе true

    let date: Date;
    let barber;
    let cur_appointment = null;

    isCommand = false;

    if (update.message.message_id == last_name_message_id) {
      await routes.clientRouter.EnterLastName(bot, update.message);
      isCommand = true;
    } else if (update.message.message_id == check_date_message_id) {
      await routes.appointmentRouter.freeDateAppointment(bot, update.message);
      isCommand = true;
    } else if (update.message.message_id == email_message_id) {
      await routes.clientRouter.EnterEmailAddress(bot, update.message);
      isCommand = true;
    }

    if (update.message.message_id == set_barber_message_id) {
      barber = await routes.barberRouter.SetBarber(bot, update.message);
      if (isCreating) {
        await routes.serviceRouter.PriceList(bot, update.message);
        set_service_msg_id = update.message.message_id + 2;
        bot.sendMessage(
          update.message.chat.id,
          'Select id service you want',
          back,
        );
      }
      if (!isCreating) {
        cur_appointment.barber_id = barber.id;
        await routes.appointmentRouter.updateAppointment(cur_appointment);
      }
      isCommand = true;
    } else if (update.message.message_id == sign_up_for_appointment_message) {
      date = await routes.appointmentRouter.SetDate(bot, update.message);
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
      await routes.appointmentRouter.SetTime(bot, update.message, date);
      if (isCreating) {
        await routes.barberRouter.BarberList(bot, update.message);
        set_barber_message_id = update.message.message_id + 2;
        bot.sendMessage(
          update.message.chat.id,
          'Enter barber id you want',
          back,
        );
      }
      isCommand = true;
    } else if (update.message.message_id == edit_appointment_message_id) {
      cur_appointment = await routes.appointmentRouter.GetAppointment(
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
      const service = await routes.serviceRouter.SetService(bot, update.message);
      if (isCreating) {
        const res = await routes.appointmentRouter.setAppointment(
          bot,
          update.message,
          date,
          barber,
          service,
        );
        if (res == false)
          sendMessage(
            bot,
            update.message,
            'Sorry, somethings wrong, try again',
            menu,
          );
        else {
          bot.sendMessage(
            update.message.chat.id,
            'Your appointment added:' +
            '[' +
            res.id +
            ']' +
            res.date +
            ' ' +
            res.service.name +
            ' ' +
            res.barber.first_name +
            ' ' +
            res.barber.last_name +
            '\r\n',
            menu,
          );
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
        if (
          await routes.appointmentRouter.RemoveMyAppointment(
            bot,
            update.message,
            cur_appointment.id,
          )
        )
          sendMessage(
            bot,
            update.message,
            'Appointment removed successfully.',
            back,
          );
        else
          sendMessage(
            bot,
            update.message,
            'Operation error, please, try again.',
            back,
          );
        isCommand = true;
        break;

      case menuButtons.BarberList:
        await routes.barberRouter.BarberList(bot, update.message);
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
        await routes.serviceRouter.PriceList(bot, update.message);
        isCommand = true;
        break;

      case menuButtons.MyProfile:
        await routes.clientRouter.MyProfile(update.message, bot);
        isCommand = true;
        break;

      case '/start':
        await routes.clientRouter.addClient(bot, update.message);
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

      case profileButtons.sendLastName:
        last_name_message_id = update.message.message_id + 2;
        sendMessage(bot, update.message, 'Enter your last_name', back);
        isCommand = true;
        break;

      case menuButtons.checkDateAppointment:
        check_date_message_id = update.message.message_id + 2;
        sendMessage(
          bot,
          update.message,
          'Enter date you would like to visit us (format: "06.05.2020")',
          back,
        );
        isCommand = true;
        break;

      case profileButtons.sendEmail:
        email_message_id = update.message.message_id + 2;
        bot.sendMessage(update.message.chat.id, 'Enter your email', back);
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
        set_time_message_id = update.message.message_id + 3;
        const obj_like_message = { text: cur_appointment.date.toString() };
        await routes.appointmentRouter.freeDateAppointment(
          bot,
          obj_like_message,
        );
        bot.sendMessage(update.message.chat.id, 'Enter time you want', back);
        isCommand = true;
        break;

      case editButtons.ChangeBarber:
        set_barber_message_id = update.message.message_id + 3;
        await routes.barberRouter.BarberList(bot, update.message);
        bot.sendMessage(
          update.message.chat.id,
          'Enter barber id you want',
          back,
        );
        isCommand = true;
        break;

      case editButtons.ChangeService:
        set_service_msg_id = update.message.message_id + 3;
        await routes.serviceRouter.PriceList(bot, update.message);
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
        await routes.appointmentRouter.showMyAppointments(
          bot,
          query.message,
        );
      } else if (query.data === 'appointmentsHistory') {
        await routes.appointmentRouter.AppointmentsHistory(
          bot,
          query.message,
        );
      }
    });
  }
}