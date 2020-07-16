import { Body, Controller, Post } from '@nestjs/common';
import { bot } from './main';
import { menu, help, profile } from './keyboards/keyboards';
import { isAppointment, isEdit, isMenu } from './keyboards/keyboard-buttons';
import {
  beditText,
  checkText,
  deditText,
  deleteText,
  helpText,
  lText,
  mText,
  seditText,
  signText,
} from './helpers/helpText';
import { sendMessage } from './helpers/sendMessage';
import { routes } from './route';
import { log } from './helpers/logUserMessage';

@Controller('bot' + process.env.TOKEN)
export class appController {

  @Post()
  async onMessage(@Body() update): Promise<void> {
    console.log(update);
    log(update);
    if (update.message.text === '/l')
      sendMessage(bot, update.message, await routes.client.Profile(update.message) + lText, help);
    else if (update.message.text === '/sedit')
      sendMessage(bot, update.message, await routes.appointment.Booked(update.message) + '\n' + await routes.service.List() + seditText, help);
    else if (update.message.text === '/m')
      sendMessage(bot, update.message, await routes.client.Profile(update.message) + mText, help);
    else if (update.message.text === '/check')
      sendMessage(bot, update.message, checkText, help);
    else if (update.message.text === '/sign')
      sendMessage(bot, update.message, signText, help);
    else if (update.message.text === '/dedit')
      sendMessage(bot, update.message, await routes.appointment.Booked(update.message) + deditText, help);
    else if (update.message.text === '/delete')
      sendMessage(bot, update.message, await routes.appointment.Booked(update.message) + deleteText, help);
    else if (update.message.text === '/bedit')
      sendMessage(bot, update.message, await routes.appointment.Booked(update.message) + '\n' + await routes.barber.List() + beditText, menu);
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
    else if (update.message.text.indexOf('/delete') != -1)
      sendMessage(bot, update.message, await routes.appointment.Delete(update.message.chat.id, update.message.text.substring(8)), menu);
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