import { Body, Controller, Post } from '@nestjs/common';
import { bot } from './main';
import { menu, help, profile } from './keyboards/keyboards';
import { isAppointment, isEdit, isMenu } from './keyboards/keyboard-buttons';
import { helpText } from './helpers/helpText';
import { sendMessage } from './helpers/sendMessage';
import { routes } from './route';
import { log } from './helpers/logUserMessage';

@Controller('bot' + process.env.TOKEN)
export class appController {

  @Post()
  async onMessage(@Body() update): Promise<void> {
    console.log(update);
    log(update);

    if(update.message.text == '/l' ||
      update.message.text == '/m' ||
      update.message.text == '/check' ||
      update.message.text == '/sign' ||
      update.message.text == '/bedit' ||
      update.message.text == '/sedit' ||
      update.message.text == '/dedit')
      sendMessage(bot, update.message, helpText, help);

    else if (update.message.text.indexOf('/l') != -1)
      sendMessage(bot, update.message, await routes.client.SetLastName(update.message.text.substring(3), update.message.chat.id), profile);
    else if (update.message.text.indexOf('/m') != -1)
      sendMessage(bot, update.message, await routes.client.SetEmail(update.message.text.substring(3)), profile);
    else if (update.message.text.indexOf('/check') != -1)
      sendMessage(bot, update.message, await routes.appointment.Free(update.message.text.substring(7)), menu);
    else if (update.message.text.indexOf('/sign') != -1)
      sendMessage(bot, update.message, await routes.appointment.Set(update.message.chat.id, update.message.text.substring(6)), menu);
    else if (update.message.text.indexOf('/bedit') != -1)
      sendMessage(bot, update.message, await routes.appointment.ChangeBarber(update.message.chat.id, update.message.text.substring(7)), menu);
    else if (update.message.text.indexOf('/sedit') != -1)
      sendMessage(bot, update.message, await routes.appointment.ChangeService(update.message.chat.id, update.message.text.substring(7)), menu);
    else if (update.message.text.indexOf('/dedit') != -1)
      sendMessage(bot, update.message, await routes.appointment.ChangeDate(update.message.chat.id, update.message.text.substring(7)), menu);
    else if (update.message.text == isMenu.Back)
      sendMessage(bot, update.message, helpText, menu);
    else if (update.message.text == isMenu.BarberList)
      sendMessage(bot, update.message, await routes.barber.List(), menu);
    else if (update.message.text == isAppointment.Booked)
      sendMessage(bot, update.message, await routes.appointment.Booked(update.message), menu);
    else if (update.message.text == isAppointment.History)
      sendMessage(bot, update.message, await routes.appointment.History(update.message), menu);
    else if (update.message.text == isMenu.PriceList)
      sendMessage(bot, update.message, await routes.service.List(), menu);
    else if (update.message.text == isMenu.Profile)
      sendMessage(bot, update.message, await routes.client.Profile(update.message), profile);
    else if (update.message.text == '/start') {
      await routes.client.addClient(bot, update.message);
      sendMessage(bot, update.message, 'Hello, ' + update.message.chat.first_name + ', i am Barber Bot. Can i help you?', menu);
    } else
      sendMessage(bot, update.message, helpText, help);
  }
}


/*
    else if (update.message.text == isEdit.ChangeTime)
      sendMessage(bot, update.message, 'no code now(', menu);
else if (update.message.text == editButtons.ChangeBarber) {
      set_barber_message_id = update.message.message_id + 3;
      await barberRouter.BarberList(bot, update.message);
      bot.sendMessage(update.message.chat.id,'Enter barber id you want',back);
    }
    else if (update.message.text == editButtons.ChangeService) {
      set_service_msg_id = update.message.message_id + 3;
      await serviceRouter.PriceList(bot, update.message);
      bot.sendMessage(update.message.chat.id, 'Enter service id you want', back);
    }
    else if (update.message.text == menuButtons.SignUpForAnAppointment) {
        isCreating = true;
        sign_up_for_appointment_message = update.message.chat.id + 2;
        bot.sendMessage(update.message.chat.id,'Enter date you would like to visit us (format: "06.05.2020")',back);
    }
else if (update.message.text == appointmentButtons.Edit) {
    edit_appointment_message_id = update.message.message_id + 2;
    bot.sendMessage(update.message.chat.id,'Enter appointment id you would like to edit',back);
  }
else if (update.message.message_id == set_barber_message_id) {
     barber = await barberRouter.SetBarber(bot, update.message);
     if (isCreating) {
       await serviceRouter.PriceList(bot, update.message);
       set_service_msg_id = update.message.message_id + 2;
       bot.sendMessage(update.message.chat.id, 'Select id service you want'back);
     }
     if (!isCreating) {
       cur_appointment.barber_id = barber.id;
       await appointmentRouter.updateAppointment(cur_appointment);
     }
   } else if (update.message.message_id == sign_up_for_appointment_message) {
     date = await appointmentRouter.SetDate(bot, update.message);
     if (isCreating) {
       set_time_message_id = update.message.message_id + 2;
       bot.sendMessage(update.message.chat.id, 'Enter time, you would like to visit us (format: "16:00")', back);
     }
   } else if (update.message.message_id == set_time_message_id) {
     await appointmentRouter.SetTime(bot, update.message, date);
     if (isCreating) {
       await barberRouter.BarberList(bot, update.message);
       set_barber_message_id = update.message.message_id + 2;
       bot.sendMessage(
         update.message.chat.id,
         'Enter barber id you want',
         back,
       );
     }
   } else if (update.message.message_id == edit_appointment_message_id) {
     cur_appointment = await appointmentRouter.GetAppointment(
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
   } else if (update.message.message_id == set_service_msg_id) {
     const service = await serviceRouter.SetService(bot, update.message);
   }

else if (update.message.text == editButtons.Delete) {
  if (await appointmentRouter.RemoveMyAppointment(bot, update.message, cur_appointment.id))
    sendMessage(bot, update.message, 'Appointment removed successfully.', back);
  else
    sendMessage(bot, update.message, 'Operation error, please, try again.', back);
}*/