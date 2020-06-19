import { AppointmentController } from '../controller/AppointmentController';
import { back, menu } from '../view/view';
const appointmentController = new AppointmentController();

export class AppointmentRouter {
  constructor(TelegramBot) {
    TelegramBot.onText(/Sign up for a service/, function (msg) {
      TelegramBot.sendMessage(msg.chat.id, appointmentController.setService(), back);
    });

  }
}