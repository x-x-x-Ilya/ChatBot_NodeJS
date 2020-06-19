import { menu, back } from '../view/view';
import { AppointmentController } from '../controller/AppointmentController';
const appointmentController = new AppointmentController();

export class AppointmentRouter {
  constructor(TelegramBot) {

    TelegramBot.onText(/Sign up for an appointment/, function (msg) {
      TelegramBot.sendMessage(msg.chat.id, appointmentController.setAppointment(), back);
    });

    TelegramBot.onText(/Show my appointments/, function (msg) {
      const back = {
        reply_markup: JSON.stringify({
          keyboard: [
            ['Back'],
            ['Remove my appointment']
          ]
        })
      };
      TelegramBot.sendMessage(msg.chat.id, appointmentController.showMyAppointments(), back);
    });

    TelegramBot.onText(/Remove my appointment/, function (msg) {
      TelegramBot.sendMessage(msg.chat.id, appointmentController.showMyAppointments(), back);
    });

  }
}

