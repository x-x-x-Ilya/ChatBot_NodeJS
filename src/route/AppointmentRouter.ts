import { menu, back } from '../view/view';
import { AppointmentController } from '../controller/AppointmentController';
const appointmentController = new AppointmentController();

export class AppointmentRouter {
  constructor(TelegramBot) {

    TelegramBot.onText(/Sign up for an appointment/, function (msg) {
      TelegramBot.sendMessage(msg.chat.id, 'Enter date you want');
      TelegramBot.on('message', async function (msg) {  // после первого выполнения продолжает использоваться
        appointmentController.checkDateAppointment(msg.text);
      });
      TelegramBot.sendMessage(msg.chat.id, appointmentController.setAppointment(), back);
    });

    TelegramBot.onText(/Scheduled appointments/, function (msg) {
      const back = {
        reply_markup: JSON.stringify({
          keyboard: [
            ['Back'],
            ['Remove my appointment']
          ]
        })
      };
      TelegramBot.sendMessage(msg.chat.id, appointmentController.showMyAppointments(msg.chat.id), back);
    });

    TelegramBot.onText(/Appointments history/, async function (msg) {
      TelegramBot.sendMessage(msg.chat.id,'Your history:' + await appointmentController.showMyHistory(/*msg.chat.id*/2), back);
    });

    TelegramBot.onText(/Remove my appointment/, function (msg) {
      TelegramBot.sendMessage(msg.chat.id, 'send me id of your appointment', back);
      TelegramBot.on('message', async function (msg) {  // после первого выполнения продолжает использоваться
        appointmentController.deleteAnointment(msg.text);
        TelegramBot.sendMessage(msg.chat.id, 'check console result', back);
      });

    });

  }
}

