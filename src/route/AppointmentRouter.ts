import { menu, back } from '../keyboards/keyboards';
import { appointmentButtons, menuButtons } from '../keyboards/key-board-buttons';
import { AppointmentController } from '../controller/AppointmentController';
import { routes } from './routes';

const appointmentController = new AppointmentController();

export class AppointmentRouter {

  async AppointmentsHistory(TelegramBot, msg) {
    TelegramBot.sendMessage(msg.chat.id, 'Your history:' + await appointmentController.showMyHistory(msg.chat.id), menu);
  }

  async GetAppointment(msg, id){
    return await appointmentController.GetAppointment(msg.chat.id, id);
  }

  async showMyAppointments(TelegramBot, msg) {
    const back = {
      reply_markup: JSON.stringify({
        resize_keyboard: true,
        keyboard: [
          [menuButtons.Back],
          [appointmentButtons.Edit]
        ]
      })
    };
    TelegramBot.sendMessage(msg.chat.id, 'Your planned appointments:' + await appointmentController.showMyAppointments(msg.chat.id), back);
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

  async RemoveMyAppointment(TelegramBot, msg) {
    TelegramBot.sendMessage(msg.chat.id, 'Send me id of your appointment', back);
    TelegramBot.onText(/\/id (.+)/, async function (msg) {  // после первого выполнения продолжает использоваться
      await appointmentController.deleteAppointment(msg.text);
      TelegramBot.sendMessage(msg.chat.id, 'check console result', back);
    });

  };

  async setAppointment(TelegramBot, msg, date, barber, service){
    return await appointmentController.setAppointment(TelegramBot, msg, date, barber, service);

  }
}
