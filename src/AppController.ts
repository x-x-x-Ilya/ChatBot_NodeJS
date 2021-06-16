import { Body, Controller, Post } from '@nestjs/common';
import { menu, profile, isProfile, isMenu } from './keyboards/keyboards';
import * as res from './keyboards/helpText';
import { send } from './middleware/sendMessage';
import { c } from './controller';
import { log } from './middleware/logging';
import { getVariables } from './helpers';

/**
 *  controller listening only request that includes "url/bot{Token}"
 */

@Controller('bot' + process.env.TOKEN)
export class AppController {
    @Post()
    async onMessage(
        @Body() update: { message: { chat: { id: any }; text: any } },
    ): Promise<void> {
        const claims = await getVariables(update);
        const message = claims.message;
        const id = claims.id;
        const text = claims.text;

        log('./logs/' + id + '.txt', text, 'user');

        // listener for commands description
        switch (text) {
            case res.l: {
                const profile = await c.client.profile(message);
                send(id, profile + res.onL, menu);
                break;
            }
            case res.sedit: {
                const booked = await c.appointment.booked(message);
                const amenitiesList = await c.service.amenitiesList();
                send(id, booked + '\n' + amenitiesList + res.onSedit, menu);
                break;
            }
            case res.m: {
                const profile = await c.client.profile(message);
                send(id, profile + res.onM, menu);
                break;
            }
            case res.check: {
                send(id, res.onCheck, menu);
                break;
            }
            case res.sign: {
                send(id, res.onSign, menu);
                break;
            }
            case res.dedit: {
                const booked = await c.appointment.booked(message);
                send(id, booked + res.onDedit, menu);
                break;
            }
            case res.del: {
                const booked = await c.appointment.booked(message);
                send(id, booked + res.onDelete, menu);
                break;
            }
            case res.bedit: {
                const booked = await c.appointment.booked(message);
                const barberList = await c.service.barberList();
                send(id, booked + '\n' + barberList + res.onBedit, menu);
                break;
            }
            // buttons
            case isMenu.Back: {
                send(id, res.onHelp, menu);
                break;
            }
            case isMenu.BarberList: {
                const barberList = await c.service.barberList();
                send(id, barberList, menu);
                break;
            }
            case isProfile.Booked: {
                const booked = await c.appointment.booked(message);
                send(id, booked, menu);
                break;
            }
            case isProfile.History: {
                const history = await c.appointment.history(message);
                send(id, history, menu);
                break;
            }
            case isMenu.PriceList: {
                const amenitiesList = await c.service.amenitiesList();
                send(id, amenitiesList, menu);
                break;
            }
            case isMenu.Profile: {
                const p = await c.client.profile(message);
                send(id, p, profile);
                break;
            }
            case '/start': {
                const firstName = message.chat.first_name;
                await c.client.addClient(id, firstName, message.chat.last_name);
                send(id, 'Hello, ' + firstName + '. Can i help you?', menu);
                break;
            }
            default: {
                if (text.indexOf(res.l) !== -1) {
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
                } else {
                    send(id, res.onHelp, menu);
                }
            }
        }
    }
}
