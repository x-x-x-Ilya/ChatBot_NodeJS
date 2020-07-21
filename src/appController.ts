import { Body, Controller, Post } from '@nestjs/common';
import { menu, profile, isProfile, isMenu } from './keyboards/keyboards';
import * as res from './helpers/helpText';
import { Send } from './middleware/sendMessage';
import { LogUser } from './middleware/logging';
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

    LogUser(update);

    if (text === '/l')
      Send(id, await controller.client.Profile(message) + res.onL, menu);
    else if (text === '/sedit')
      Send(id, await controller.appointment.Booked(message) + '\n' + await controller.service.List() + res.onSedit, menu);
    else if (text === '/m')
      Send(id, await controller.client.Profile(message) + res.onM, menu);
    else if (text === '/check')
      Send(id, res.onCheck, menu);
    else if (text === '/sign')
      Send(id, res.onSign, menu);
    else if (text === '/dedit')
      Send(id, await controller.appointment.Booked(message) + res.onDedit, menu);
    else if (text === '/delete')
      Send(id, await controller.appointment.Booked(message) + res.onDelete, menu);
    else if (text === '/bedit')
      Send(id, await controller.appointment.Booked(message) + '\n' + await controller.barber.List() + res.onBedit, menu);
    else if (await isCommand(text, '/l', id))      //text.indexOf('/l') != -1)
      Send(id, await controller.client.SetLastName(text.substring(3), id), profile);
    else if (text.indexOf('/m') != -1)
      Send(id, await controller.client.SetEmail(text.substring(3), id), profile);
    else if (text.indexOf('/check') != -1)
      Send(id, await controller.appointment.Free(text.substring(7)), menu);
    else if (text.indexOf('/sign') != -1)
      Send(id, await controller.appointment.Set(id, text.substring(6)), menu);
    else if (text.indexOf('/bedit') != -1)
      Send(id, await controller.appointment.ChangeBarber(id, text.substring(7)), menu);
    else if (text.indexOf('/sedit') != -1)
      Send(id, await controller.appointment.ChangeService(id, text.substring(7)), menu);
    else if (text.indexOf('/dedit') != -1)
      Send(id, await controller.appointment.ChangeDate(id, text.substring(7)), menu);
    else if (text.indexOf('/delete') != -1)
      Send(id, await controller.appointment.Delete(id, text.substring(8)), menu);
    else if (text === isMenu.Back)
      Send(id, res.onHelp, menu);
    else if (text === isMenu.BarberList)
      Send(id, await controller.barber.List(), menu);
    else if (text === isProfile.Booked)
      Send(id, await controller.appointment.Booked(message), menu);
    else if (text === isProfile.History)
      Send(id, await controller.appointment.History(message), menu);
    else if (text === isMenu.PriceList)
      Send(id, await controller.service.List(), menu);
    else if (text === isMenu.Profile)
      Send(id, await controller.client.Profile(message), profile);
    else if (text === '/start') {
      await controller.client.AddClient(message);
      Send(id, 'Hello, ' + message.chat.first_name + ', i am Barber Bot. Can i help you?', menu);
    } else
      Send(id, res.onHelp, menu);
  }
}
