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

    if (text === '/l') {
      const profile = await controller.client.profile(message);
      send(id, profile + res.onL, menu);
    } else if (text === '/sedit') {
      const booked = await controller.appointment.booked(message);
      const list = await controller.service.list()
      send(id, booked + '\n' + list + res.onSedit, menu);
    } else if (text === '/m') {
      const profile = await controller.client.profile(message);
      send(id, profile + res.onM, menu);
    } else if (text === '/check')
      send(id, res.onCheck, menu);
    else if (text === '/sign')
      send(id, res.onSign, menu);
    else if (text === '/dedit') {
      const booked = await controller.appointment.booked(message);
      send(id, booked + res.onDedit, menu);
    } else if (text === '/delete') {
      const booked = await controller.appointment.booked(message);
      send(id, booked + res.onDelete, menu);
    } else if (text === '/bedit') {
      const booked = await controller.appointment.booked(message);
      const list = await controller.barber.list();
      send(id, booked + '\n' + list + res.onBedit, menu);
    }

    else if (await isCommand(text, '/l', id)) {
      const set = await controller.client.setLastName(text, id);
      send(id, set, profile);
    } else if (await isCommand(text, '/m', id)) {
      const set = await controller.client.setEmail(text, id);
      send(id, set, profile);
    } else if (await isCommand(text, '/check', id)) {
      const free = await controller.appointment.free(text);
      send(id, free, menu);
    } else if (await isCommand(text, '/sign', id)) {
      const set = await controller.appointment.set(id, text);
      send(id, set, menu);
    } else if (await isCommand(text, '/bedit', id)) {
      const change = await controller.appointment.changeBarber(id, text);
      send(id, change, menu);
    } else if (await isCommand(text, '/sedit', id)) {
      const change = await controller.appointment.changeService(id, text);
      send(id, change, menu);
    } else if (await isCommand(text, '/dedit', id)) {
      const change = await controller.appointment.changeDate(id, text);
      send(id, change, menu);
    } else if (await isCommand(text, '/delete', id)) {
      const del = await controller.appointment.delete(id, text);
      send(id, del, menu);
    }

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
      await controller.client.addClient(id, message.chat.first_name,
        message.chat.last_name);
      send(id, 'Hello, ' + message.chat.first_name +
        ', i am Barber Bot. Can i help you?', menu);
    } else
      send(id, res.onHelp, menu);
  }
}
