import { Body, Controller, Post } from '@nestjs/common';
import { menu, profile, isProfile, isMenu } from './keyboards/keyboards';
import { beditText, checkText, deditText, deleteText,
  helpText, lText, mText, seditText, signText, } from './helpers/helpText';
import { send } from './middleware/sendMessage';
import { log_user } from './middleware/logging';
import { ClientController } from './controller/ClientController';
import { BarberController } from './controller/BarberController';
import { ServiceController } from './controller/ServiceController';
import { AppointmentController } from './controller/AppointmentController';
import { Update } from './middleware/TelegramClasses';

const client = new ClientController();
const barber = new BarberController();
const service = new ServiceController();
const appointment = new AppointmentController();

//Controller listen only request that includes "url/bot{Token}"
@Controller('bot' + process.env.TOKEN)
export class appController {
  @Post()
  async onMessage(@Body() update: Update): Promise<void> {

    // for simple code
    const message = update.message;
    const id = update.message.chat.id;
    const text = update.message.text;

    log_user(update);

    if (text === '/l')
      send(id, await client.Profile(message) + lText, menu);
    else if (text === '/sedit')
      send(id, await appointment.Booked(message) + '\n' + await service.List() + seditText, menu);
    else if (text === '/m')
      send(id, await client.Profile(message) + mText, menu);
    else if (text === '/check')
      send(id, checkText, menu);
    else if (text === '/sign')
      send(id, signText, menu);
    else if (text === '/dedit')
      send(id, await appointment.Booked(message) + deditText, menu);
    else if (text === '/delete')
      send(id, await appointment.Booked(message) + deleteText, menu);
    else if (text === '/bedit')
      send(id, await appointment.Booked(message) + '\n' + await barber.List() + beditText, menu);
    else if (text.indexOf('/l') != -1)
      send(id, await client.SetLastName(text.substring(3), id), profile);
    else if (text.indexOf('/m') != -1)
      send(id, await client.SetEmail(text.substring(3), id), profile);
    else if (text.indexOf('/check') != -1)
      send(id, await appointment.Free(text.substring(7)), menu);
    else if (text.indexOf('/sign') != -1)
      send(id, await appointment.Set(id, text.substring(6)), menu);
    else if (text.indexOf('/bedit') != -1)
      send(id, await appointment.ChangeBarber(id, text.substring(7)), menu);
    else if (text.indexOf('/sedit') != -1)
      send(id, await appointment.ChangeService(id, text.substring(7)), menu);
    else if (text.indexOf('/dedit') != -1)
      send(id, await appointment.ChangeDate(id, text.substring(7)), menu);
    else if (text.indexOf('/delete') != -1)
      send(id, await appointment.Delete(id, text.substring(8)), menu);
    else if (text === isMenu.Back)
      send(id, helpText, menu);
    else if (text === isMenu.BarberList)
      send(id, await barber.List(), menu);
    else if (text === isProfile.Booked)
      send(id, await appointment.Booked(message), menu);
    else if (text === isProfile.History)
      send(id, await appointment.History(message), menu);
    else if (text === isMenu.PriceList)
      send(id, await service.List(), menu);
    else if (text === isMenu.Profile)
      send(id, await client.Profile(message), profile);
    else if (text === '/start') {
      await client.addClient(message);
      send(id, 'Hello, ' + message.chat.first_name + ', i am Barber Bot. Can i help you?', menu);
    } else
      send(id, helpText, menu);
  }
}
