import { Body, Controller, Post } from '@nestjs/common';
import { menu, profile, isProfile, isMenu } from './keyboards/keyboards';
import * as res from './keyboards/helpText';
import { send } from './middleware/sendMessage';
import { c } from './controller';
import { log } from './middleware/logging';

/**
 *  controller listening only request that includes "url/bot{Token}"
 */

  async function get_variables(update) {
        const message = update.message;
        const id = update.message.chat.id;
        const text = update.message.text;
        return [message, id, text];
      }


@Controller('bot' + process.env.TOKEN)
export class AppController {



  @Post()
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async onMessage(@Body() update): Promise<void> {
    // variables for simple code
    const v = get_variables(update);
    const message = v[0];
    const id = v[1];
    const text = v[2];

    log('./logs/' + id + '.txt', text, 'user');

    // listener for commands description
    if (text === res.l)
      send(id, await c.client.profile(message) + res.onL, menu);
     else if (text === res.sedit)
      send(id, await c.appointment.booked(message) + '\n' +
        await c.service.amenitiesList() + res.onSedit, menu);
     else if (text === res.m)
      send(id, await c.client.profile(message) + res.onM, menu);
     else if (text === res.check)
      send(id, res.onCheck, menu);
    else if (text === res.sign)
      send(id, res.onSign, menu);
    else if (text === res.dedit)
      send(id, await c.appointment.booked(message) + res.onDedit, menu);
     else if (text === res.del)
      send(id, await c.appointment.booked(message) + res.onDelete, menu);
     else if (text === res.bedit)
      send(id, await c.appointment.booked(message) + '\n' +
        await c.service.barberList() + res.onBedit, menu);
    // listener for commands
    else if (text.indexOf(res.l) !== -1)
      send(id, await c.client.setLastName(text, id), profile);
     else if (text.indexOf(res.m) !== -1)
      send(id, await c.client.setEmail(text, id), profile);
     else if (text.indexOf(res.check) !== -1)
      send(id, await c.appointment.free(text), menu);
     else if (text.indexOf(res.sign) !== -1)
      send(id, await c.appointment.set(id, text), menu);
     else if (text.indexOf(res.bedit) !== -1)
      send(id, await c.appointment.changeBarber(id, text), menu);
     else if (text.indexOf(res.sedit) !== -1)
      send(id, await c.appointment.changeService(id, text), menu);
     else if ((text.indexOf(res.dedit) !== -1))
      send(id, await c.appointment.changeDate(id, text), menu);
     else if ((text.indexOf(res.del) !== -1))
      send(id, await c.appointment.delete(id, text), menu);
    // listener for buttons
    else if (text === isMenu.Back)
      send(id, res.onHelp, menu);
    else if (text === isMenu.BarberList)
      send(id, await c.service.barberList(), menu);
    else if (text === isProfile.Booked)
      send(id, await c.appointment.booked(message), menu);
    else if (text === isProfile.History)
      send(id, await c.appointment.history(message), menu);
    else if (text === isMenu.PriceList)
      send(id, await c.service.amenitiesList(), menu);
    else if (text === isMenu.Profile)
      send(id, await c.client.profile(message), profile);
    // listener for start message
    else if (text === '/start') {
      const firstName = message.chat.first_name;
      await c.client.addClient(id, firstName, message.chat.last_name);
      send(id, 'Hello, ' + firstName + '. Can i help you?', menu);
    }
    // listener for other messages
    else
      send(id, res.onHelp, menu);
  }

}
