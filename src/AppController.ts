import { Body, Controller, Post } from '@nestjs/common';
import { menu, profile, isProfile, isMenu } from './keyboards/keyboards';
import * as res from './keyboards/helpText';
import { send } from './middleware/sendMessage';
import { c } from './controller';
import { log } from './middleware/logging';
import { get_variables } from './helpers';

/**
 *  controller listening only request that includes "url/bot{Token}"
 */

@Controller('bot' + process.env.TOKEN)
export class AppController {
    @Post()
    async onMessage(
        @Body() update: { message: { chat: { id: any }; text: any } },
    ): Promise<void> {
        const claims = get_variables(update);
        const message = claims[0];
        const id = claims[1];
        const text = claims[2];

        log('./logs/' + id + '.txt', text, 'user');

        // listener for commands description
        if (text === res.l) {
            const profile = await c.client.profile(message);
            send(id, profile + res.onL, menu);
        } else if (text === res.sedit) {
            const booked = await c.appointment.booked(message);
            const amenitiesList = await c.service.amenitiesList();
            send(id, booked + '\n' + amenitiesList + res.onSedit, menu);
        } else if (text === res.m) {
            const profile = await c.client.profile(message);
            send(id, profile + res.onM, menu);
        } else if (text === res.check) {
            send(id, res.onCheck, menu);
        } else if (text === res.sign) send(id, res.onSign, menu);
        else if (text === res.dedit) {
            const booked = await c.appointment.booked(message);
            send(id, booked + res.onDedit, menu);
        } else if (text === res.del) {
            const booked = await c.appointment.booked(message);
            send(id, booked + res.onDelete, menu);
        } else if (text === res.bedit) {
            const booked = await c.appointment.booked(message);
            const barberList = await c.service.barberList();
            send(id, booked + '\n' + barberList + res.onBedit, menu);
            // listener for commands
        } else if (text.indexOf(res.l) !== -1) {
            const setLastName = await c.client.setLastName(text, id);
            send(id, setLastName, profile);
        } else if (text.indexOf(res.m) !== -1) {
            const setEmail = await c.client.setEmail(text, id);
            send(id, setEmail, profile);
        } else if (text.indexOf(res.check) !== -1) {
            const free = await c.appointment.free(text);
            send(id, free, menu);
        } else if (text.indexOf(res.sign) !== -1) {
            const set = await c.appointment.set(id, text);
            send(id, set, menu);
        } else if (text.indexOf(res.bedit) !== -1) {
            const changeBarber = await c.appointment.changeBarber(id, text);
            send(id, changeBarber, menu);
        } else if (text.indexOf(res.sedit) !== -1) {
            const changeService = await c.appointment.changeService(id, text);
            send(id, changeService, menu);
        } else if (text.indexOf(res.dedit) !== -1) {
            const changeDate = await c.appointment.changeDate(id, text);
            send(id, changeDate, menu);
        } else if (text.indexOf(res.del) !== -1) {
            const del = await c.appointment.delete(id, text);
            send(id, del, menu);
            // listener for buttons
        } else if (text === isMenu.Back) {
            send(id, res.onHelp, menu);
        } else if (text === isMenu.BarberList) {
            send(id, await c.service.barberList(), menu);
        } else if (text === isProfile.Booked) {
            send(id, await c.appointment.booked(message), menu);
        } else if (text === isProfile.History) {
            send(id, await c.appointment.history(message), menu);
        } else if (text === isMenu.PriceList) {
            send(id, await c.service.amenitiesList(), menu);
        } else if (text === isMenu.Profile) {
            send(id, await c.client.profile(message), profile);
            // listener for start message
        } else if (text === '/start') {
            const firstName = message.chat.first_name;
            await c.client.addClient(id, firstName, message.chat.last_name);
            send(id, 'Hello, ' + firstName + '. Can i help you?', menu);
        }
        // listener for other messages
        else send(id, res.onHelp, menu);
    }
}
