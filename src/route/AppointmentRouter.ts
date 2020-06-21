import { menu, back } from '../keyboards/keyboards';
import { AppointmentController } from '../controller/AppointmentController';
const appointmentController = new AppointmentController();

export class AppointmentRouter {
  // вместо двух кнопок сделать одну с inline клавиатурой  (Scheduled appointments, Appointments history)
  async AppointmentsHistory(TelegramBot, msg) {
    TelegramBot.sendMessage(msg.chat.id, 'Your history:' + await appointmentController.showMyHistory(/*msg.chat.id*/2), back);
  }

  async showMyAppointments(TelegramBot, msg) {
    const back = {
      reply_markup: JSON.stringify({
        keyboard: [
          ['Back'],
          ['Remove my appointment']
        ]
      })
    };
    TelegramBot.sendMessage(msg.chat.id, 'Your history:' + await appointmentController.showMyAppointments(/*msg.chat.id*/2), back);
  }

  /*constructor(TelegramBot) {

    TelegramBot.onText(/Sign up for an appointment/, function (msg) {
      TelegramBot.sendMessage(msg.chat.id, 'Enter date you want');
      TelegramBot.on('message', async function (msg) {  // после первого выполнения продолжает использоваться
        appointmentController.checkDateAppointment(msg.text);
      });
      TelegramBot.sendMessage(msg.chat.id, appointmentController.setAppointment(), back);
    });

    TelegramBot.onText(/Remove my appointment/, function (msg) {
      TelegramBot.sendMessage(msg.chat.id, 'send me id of your appointment', back);
      TelegramBot.on('message', async function (msg) {  // после первого выполнения продолжает использоваться
        appointmentController.deleteAnointment(msg.text);
        TelegramBot.sendMessage(msg.chat.id, 'check console result', back);
      });

    });

  }*/
}

