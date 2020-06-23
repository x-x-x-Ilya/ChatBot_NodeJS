import { menu, back } from '../keyboards/keyboards';
import { menuButtons } from '../keyboards/key-board-buttons';
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
          [menuButtons.Back],
          ['Remove my appointment']
        ]
      })
    };
    TelegramBot.sendMessage(msg.chat.id, 'Your planned appointments:' + await appointmentController.showMyAppointments(/*msg.chat.id*/2), back);
  }

  async SignUpForAnAppointment(TelegramBot, msg) {
      TelegramBot.sendMessage(msg.chat.id, 'Enter date you would like to visit us (as example 06.05.2020)');
      await TelegramBot.on('message', async function (msg) {  // после первого выполнения продолжает использоваться
        await appointmentController.checkDateAppointment(msg.text);
      });
      //TelegramBot.sendMessage(msg.chat.id, appointmentController.setAppointment(), back);
    };

  async RemoveMyAppointment(TelegramBot, msg) {
    TelegramBot.sendMessage(msg.chat.id, await appointmentController.showMyAppointments(/*msg.chat.id*/2));
      TelegramBot.sendMessage(msg.chat.id, 'send me id of your appointment', back);
      TelegramBot.on('message', async function (msg) {  // после первого выполнения продолжает использоваться
        appointmentController.deleteAppointment(msg.text);
        TelegramBot.sendMessage(msg.chat.id, 'check console result', back);
      });

    };


}

