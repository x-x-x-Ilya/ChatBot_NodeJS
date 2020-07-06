import {
  menu,
  back,
  back_with_edit_button,
  profile,
} from '../keyboards/keyboards';
import {
  appointmentButtons,
  menuButtons,
} from '../keyboards/key-board-buttons';
import { AppointmentController } from '../controller/AppointmentController';
import { routes } from './routes';

const appointmentController = new AppointmentController();

export class AppointmentRouter {
  async AppointmentsHistory(TelegramBot: any, msg: any): Promise<void> {
    const history = await appointmentController.showMyHistory(msg.chat.id);
    if (history != false)
      TelegramBot.sendMessage(msg.chat.id, 'Your history:' + history, menu);
    else TelegramBot.sendMessage(msg.chat.id, 'You have empty history', menu);
  }

  async GetAppointment(msg: any, id: number): Promise<any> {
    return await appointmentController.GetAppointment(msg.chat.id, id);
  }

  async showMyAppointments(TelegramBot: any, msg: any): Promise<void> {
    const booked_appointments = await appointmentController.showMyAppointments(
      msg.chat.id,
    );
    if (booked_appointments != false)
      TelegramBot.sendMessage(
        msg.chat.id,
        'Your planned appointments:' + booked_appointments,
        back_with_edit_button,
      );
    else
      TelegramBot.sendMessage(
        msg.chat.id,
        'You have no planned appointments',
        profile,
      );
  }

  async freeDateAppointment(TelegramBot: any, msg: any): Promise<void> {
    const t = msg.text.split('.'),
      Year = t[2],
      Month = parseInt(t[1]) - 1,
      day = parseInt(t[0]);
    const check_date = new Date(Year, Month, day);
    if (check_date > new Date())
      TelegramBot.sendMessage(
        msg.chat.id,
        await appointmentController.freeDateAppointment(check_date),
        menu,
      );
    else TelegramBot.sendMessage(msg.chat.id, 'Date should be in future');
  }

  async SetDate(TelegramBot: any, msg: any): Promise<any> {
    const t = msg.text.split('.'),
      Year = t[2],
      Month = parseInt(t[1]) - 1,
      day = parseInt(t[0]);
    const check_date = new Date(Year, Month, day);
    if (check_date >= new Date()) {
      TelegramBot.sendMessage(
        msg.chat.id,
        await appointmentController.freeDateAppointment(check_date),
        back,
      );
      return check_date;
    } else {
      TelegramBot.sendMessage(msg.chat.id, 'Date should be in future', back);
    }
  }

  async SetTime(TelegramBot: any, msg: any, date: Date): Promise<any> {
    const t = msg.text.split(':');
    date.setHours(parseInt(t[0], 10));
    date.setMinutes(parseInt(t[1], 10));
    return date;
  }

  async RemoveMyAppointment(
    TelegramBot: any,
    msg: any,
    appointment: any,
  ): Promise<any> {
    return await appointmentController.deleteAppointment(
      msg.chat.id,
      appointment,
    );
  }

  async updateAppointment(currentAppointment) {
    return await appointmentController.updateAppointment(currentAppointment);
  }

  async setAppointment(
    TelegramBot: any,
    msg: any,
    date: Date,
    barber: any,
    service: any,
  ): Promise<any> {
    return await appointmentController.setAppointment(
      TelegramBot,
      msg,
      date,
      barber,
      service,
    );
  }
}
