import { Body, Controller, Post } from '@nestjs/common';
import { menu, profile, isProfile, isMenu } from './keyboards/keyboards';
import * as res from './keyboards/helpText';
import { send } from './middleware/sendMessage';
import { Update } from './middleware/TelegramClasses';
import { controller } from './controller';
import { log } from './middleware/logging';

/**
 *  Controller listening only request that includes "url/bot{Token}"
 */

@Controller('bot' + process.env.TOKEN)
export class appController {

  @Post()
  async onMessage(@Body() update: Update): Promise<void> {

    // for simple code
    const message = update.message;
    const id = update.message.chat.id;
    const text = update.message.text;

    log('./logs/' + id + '.txt', text, 'user');

    // commands description
    if (text === '/l') {
      const profile = await controller.client.profile(message);
      send(id, profile + res.onL, menu);
    } else if (text === '/sedit') {
      const booked = await controller.appointment.booked(message);
      const list = await controller.service.amenitiesList();
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
      const list = await controller.service.barberList();
      send(id, booked + '\n' + list + res.onBedit, menu);
    }
    // commands
    else if (text.indexOf('/l') !== -1) {
      const set = await controller.client.setLastName(text, id);
      send(id, set, profile);
    } else if (text.indexOf('/m') !== -1) {
      const set = await controller.client.setEmail(text, id);
      send(id, set, profile);
    } else if (text.indexOf('/check') !== -1) {
      const free = await controller.appointment.free(text);
      send(id, free, menu);
    } else if (text.indexOf('/sign') !== -1) {
      const set = await controller.appointment.set(id, text);
      send(id, set, menu);
    } else if (text.indexOf('/bedit') !== -1) {
      const change = await controller.appointment.changeBarber(id, text);
      send(id, change, menu);
    } else if (text.indexOf('/sedit') !== -1) {
      const change = await controller.appointment.changeService(id, text);
      send(id, change, menu);
    } else if ((text.indexOf('/dedit') !== -1)) {
      const change = await controller.appointment.changeDate(id, text);
      send(id, change, menu);
    } else if ((text.indexOf('/delete') !== -1)) {
      const del = await controller.appointment.delete(id, text);
      send(id, del, menu);
    }
    // buttons
    else if (text === isMenu.Back)
      send(id, res.onHelp, menu);
    else if (text === isMenu.BarberList)
      send(id, await controller.service.barberList(), menu);
    else if (text === isProfile.Booked)
      send(id, await controller.appointment.booked(message), menu);
    else if (text === isProfile.History)
      send(id, await controller.appointment.history(message), menu);
    else if (text === isMenu.PriceList)
      send(id, await controller.service.amenitiesList(), menu);
    else if (text === isMenu.Profile)
      send(id, await controller.client.profile(message), profile);
    // on start message
    else if (text === '/start') {
      const firstName = message.chat.first_name;
      await controller.client.addClient(id, firstName, message.chat.last_name);
      send(id, 'Hello, ' + firstName + '. Can i help you?', menu);
    }
    // if unknown message
    else
      send(id, res.onHelp, menu);
  }
}
