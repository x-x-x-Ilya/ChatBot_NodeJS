import { Body, Controller, Post } from '@nestjs/common';
import { menu, profile, isProfile, isMenu } from './keyboards/keyboards';
import * as res from './helpers/helpText';
import { send } from './middleware/sendMessage';
import { logUser } from './middleware/logging';
import { Update } from './middleware/TelegramClasses';
import { controller } from './controller';
import { isCommand } from './middleware/commandValidator';

//Controller listen only request that includes "url/bot{Token}"
@Controller('bot' + process.env.TOKEN)
export class appController {
  @Post()
  async onMessage(@Body() update: Update): Promise<void> {

    // for simple code
    const message = update.message;
    const id = update.message.chat.id;
    const text = update.message.text;

    logUser(update);

    if (text === '/l')
      send(id, await controller.client.profile(message) + res.onL, menu);
    else if (text === '/sedit')
      send(id, await controller.appointment.booked(message) + '\n' + await controller.service.list() + res.onSedit, menu);
    else if (text === '/m')
      send(id, await controller.client.profile(message) + res.onM, menu);
    else if (text === '/check')
      send(id, res.onCheck, menu);
    else if (text === '/sign')
      send(id, res.onSign, menu);
    else if (text === '/dedit')
      send(id, await controller.appointment.booked(message) + res.onDedit, menu);
    else if (text === '/delete')
      send(id, await controller.appointment.booked(message) + res.onDelete, menu);
    else if (text === '/bedit')
      send(id, await controller.appointment.booked(message) + '\n' + await controller.barber.list() + res.onBedit, menu);
    else if (await isCommand(text, '/l', id))      //text.indexOf('/l') != -1)
      send(id, await controller.client.setLastName(text.substring(3), id), profile);
    else if (text.indexOf('/m') != -1)
      send(id, await controller.client.setEmail(text.substring(3), id), profile);
    else if (text.indexOf('/check') != -1)
      send(id, await controller.appointment.free(text.substring(7)), menu);
    else if (text.indexOf('/sign') != -1)
      send(id, await controller.appointment.set(id, text.substring(6)), menu);
    else if (text.indexOf('/bedit') != -1)
      send(id, await controller.appointment.changeBarber(id, text.substring(7)), menu);
    else if (text.indexOf('/sedit') != -1)
      send(id, await controller.appointment.changeService(id, text.substring(7)), menu);
    else if (text.indexOf('/dedit') != -1)
      send(id, await controller.appointment.changeDate(id, text.substring(7)), menu);
    else if (text.indexOf('/delete') != -1)
      send(id, await controller.appointment.delete(id, text.substring(8)), menu);
    else if (text === isMenu.Back)
      send(id, res.onHelp, menu);
    else if (text === isMenu.BarberList)
      send(id, await controller.barber.list(), menu);
    else if (text === isProfile.Booked)
      send(id, await controller.appointment.booked(message), menu);
    else if (text === isProfile.History)
      send(id, await controller.appointment.history(message), menu);
    else if (text === isMenu.PriceList)
      send(id, await controller.service.list(), menu);
    else if (text === isMenu.Profile)
      send(id, await controller.client.profile(message), profile);
    else if (text === '/start') {
      await controller.client.addClient(message);
      send(id, 'Hello, ' + message.chat.first_name + ', i am Barber Bot. Can i help you?', menu);
    } else
      send(id, res.onHelp, menu);
  }
}
