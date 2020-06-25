import { menu, back } from '../keyboards/keyboards';
import { menuButtons } from '../keyboards/key-board-buttons';
import { AppointmentController } from '../controller/AppointmentController';
import { ServiceController} from '../controller/ServiceController';
import { BarberController} from '../controller/BarberController';

const barberController = new BarberController();
const serviceController = new ServiceController();
const appointmentController = new AppointmentController();

export class AppointmentRouter {

  async AppointmentsHistory(TelegramBot, msg) {
    TelegramBot.sendMessage(msg.chat.id, 'Your history:' + await appointmentController.showMyHistory(msg.chat.id), menu);
  }

  async showMyAppointments(TelegramBot, msg) {
    const back = {
      reply_markup: JSON.stringify({
        resize_keyboard: true,
        keyboard: [
          [menuButtons.Back],
          ['Remove my appointment']
        ]
      })
    };
    TelegramBot.sendMessage(msg.chat.id, 'Your planned appointments:' + await appointmentController.showMyAppointments(msg.chat.id), back);
  }

  async checkDateAppointment(TelegramBot, msg) {
    TelegramBot.sendMessage(msg.chat.id, 'Enter date you would like to visit us (format: "/date 06.05.2020")');
    TelegramBot.onText(/\/date (.+)/, async (msg) => {
      const date = await appointmentController.checkDateAppointment(msg.text.substring(6, msg.text.length));
      TelegramBot.sendMessage(msg.chat.id, date);
    });
  };

  async SignUpForAService(TelegramBot, msg){
    TelegramBot.sendMessage(msg.chat.id, 'Enter date you would like to visit us (format: "/date 06.05.2020")');
    TelegramBot.onText(/\/date (.+)/, async (msg) => {
      const date = msg.text.substring(6, msg.text.length);
      TelegramBot.sendMessage(msg.chat.id, 'Enter time you would like to visit us (format: "/time 16:00")');
      TelegramBot.onText(/\/time (.+)/, async (msg) => {  // всегда одно и то же время ???
        const time = msg.text.substring(6, msg.text.length);
        if(await appointmentController.setAppointment(date, time, msg.chat.id))
         TelegramBot.sendMessage(msg.chat.id, "Your appointment added, you can also set barber and service or do it later.");
        //set barber
          // set service

        else
          TelegramBot.sendMessage(msg.chat.id, "Something's wrong, please try again");
      });
    });
  }


    /*

    TelegramBot.sendMessage(msg.chat.id, 'send me time you want (format: "/time 10:17)');
    TelegramBot.onText(/\/time (.+)/, async (msg) => {
      appointment.push(msg.text.substring(6, msg.text.length));
      //TelegramBot.sendMessage(msg.chat.id, await appointmentController.checkDateAndTimeAppointment(appointment));
    });

    TelegramBot.sendMessage(msg.chat.id, 'send me service you want (format: "/service "service_name")');
    TelegramBot.onText(/\/service (.+)/, async (msg) => {
      //TelegramBot.sendMessage(msg.chat.id, await serviceController.setService(msg.text.substring(8, msg.text.length)));
      appointment.push(msg.text.substring(8, msg.text.length));
    });

    TelegramBot.sendMessage(msg.chat.id, 'send me barber you want (format: "/barber "barber_name")');
    TelegramBot.onText(/\/barber (.+)/, async (msg) => {
      //TelegramBot.sendMessage(msg.chat.id, await barberController.setBarber(msg.text.substring(8, msg.text.length)));
      appointment.push(msg.text.substring(8, msg.text.length));
    });*/
    // await appointmentController.setBarber()

    //  all info together and accept
    //  saving
    //  TelegramBot.sendMessage(msg.chat.id, appointmentController.setAppointment(), back);


  async RemoveMyAppointment(TelegramBot, msg) {
    TelegramBot.sendMessage(msg.chat.id, await appointmentController.showMyAppointments(/*msg.chat.id*/2));
      TelegramBot.sendMessage(msg.chat.id, 'send me id of your appointment', back);
      TelegramBot.on('message', async function (msg) {  // после первого выполнения продолжает использоваться
        appointmentController.deleteAppointment(msg.text);
        TelegramBot.sendMessage(msg.chat.id, 'check console result', back);
      });

    };


}

