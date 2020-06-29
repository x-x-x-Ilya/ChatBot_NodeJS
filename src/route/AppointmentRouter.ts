import { menu, back, back_with_edit_button, profile } from '../keyboards/keyboards';
import { appointmentButtons, menuButtons } from '../keyboards/key-board-buttons';
import { AppointmentController } from '../controller/AppointmentController';
import { routes } from './routes';

const appointmentController = new AppointmentController();

export class AppointmentRouter {

  async AppointmentsHistory(TelegramBot, msg) {
    const history = await appointmentController.showMyHistory(msg.chat.id);
    if(history != false)
    TelegramBot.sendMessage(msg.chat.id, 'Your history:' + history, menu);
    else
      TelegramBot.sendMessage(msg.chat.id, 'You have empty history', menu);
  }

  async GetAppointment(msg, id){
    return await appointmentController.GetAppointment(msg.chat.id, id);
  }

  async showMyAppointments(TelegramBot, msg) {
    const booked_appointments = await appointmentController.showMyAppointments(msg.chat.id)
    if(booked_appointments != false)
    TelegramBot.sendMessage(msg.chat.id, 'Your planned appointments:' + booked_appointments, back_with_edit_button);
    else
      TelegramBot.sendMessage(msg.chat.id, 'You have no planned appointments', profile);

  }

  async freeDateAppointment(TelegramBot, msg) {
      const date = msg.text.substring(6, msg.text.length);
      const t = date.split('.'),
        Year = t[2],
        Month = parseInt(t[1]) - 1,
        day = parseInt(t[0]);
      const check_date = new Date(Year, Month, day);
      if(check_date > new Date())
        TelegramBot.sendMessage(msg.chat.id, await appointmentController.freeDateAppointment(check_date), menu);
      else
        TelegramBot.sendMessage(msg.chat.id, 'Date should be in future');
  };

  async SetDate(TelegramBot, msg) {
    const date = msg.text.substring(6, msg.text.length);
    const t = date.split('.'), Year = t[2], Month = parseInt(t[1]) - 1, day = parseInt(t[0]);
    const check_date = new Date(Year, Month, day);
    if (check_date >= new Date()) {
      TelegramBot.sendMessage(msg.chat.id, await appointmentController.freeDateAppointment(check_date), back);
      TelegramBot.sendMessage(msg.chat.id, 'Enter time, you would like to visit us (format: "/time 16:00")', back);
      return check_date;
    } else {
      TelegramBot.sendMessage(msg.chat.id, 'Date should be in future', back);
    }
  }

  async SetTime(TelegramBot, msg, date:Date) {
    const time = msg.text.substring(6, msg.text.length);
    const t = time.split(':');
    date.setHours(parseInt(t[0], 10));
    date.setMinutes(parseInt(t[1], 10));
    await routes.barberRouter.BarberList(TelegramBot, msg);
    TelegramBot.sendMessage(msg.chat.id, 'Enter barber id you want (format: "/barber 81558452")', back);
    // добавить проверку, что это время действительно свободно
    return date;
  }

  async RemoveMyAppointment(TelegramBot, msg, appointment) {
      return await appointmentController.deleteAppointment(msg.chat.id, appointment);
  };

  async setAppointment(TelegramBot, msg, date, barber, service){
    return await appointmentController.setAppointment(TelegramBot, msg, date, barber, service);

  }
}
