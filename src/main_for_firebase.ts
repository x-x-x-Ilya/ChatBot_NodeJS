import * as functions from 'firebase-functions'
import * as express from "express";
import * as cors from 'cors'
import * as response from "./keyboards/helpText";
import {controller} from "./controller";
import {isMenu, isProfile} from "./keyboards/keyboards";


const app = express()
app.use(cors({ origin: true }))

app.post('/', async (req, res) => {
    const isTelegramMessage = req.body
        && req.body.message
        && req.body.message.chat
        && req.body.message.chat.id
        && req.body.message.from
        && req.body.message.from.first_name
    if (isTelegramMessage) {
        const chat_id = req.body.message.chat.id
        const message = req.body.message
        const text = req.body.message.text
        //return res.status(200).send({method: 'sendMessage', chat_id, text: `HelloWorld`})
        if (text === response.l) {
            // tslint:disable-next-line:no-shadowed-variable
            const profile = await controller.client.profile(message);
            return res.status(200).send({method: 'sendMessage', chat_id, text: profile + response.onL})
        } else if (text === response.sedit) {
            const booked = await controller.appointment.booked(message);
            const list = await controller.service.amenitiesList();
            return res.status(200).send({method: 'sendMessage', chat_id, text: booked + '\n' + list + response.onSedit});
        } else if (text === response.m) {
            // tslint:disable-next-line:no-shadowed-variable
            const profile = await controller.client.profile(message);
            return res.status(200).send({method: 'sendMessage', chat_id, text: profile + response.onM});
        } else if (text === response.check)
            return res.status(200).send({method: 'sendMessage', chat_id, text: response.onCheck});
        else if (text === response.sign)
            return res.status(200).send({method: 'sendMessage', chat_id, text: response.onSign});
        else if (text === response.dedit) {
            const booked = await controller.appointment.booked(message);
            return res.status(200).send({method: 'sendMessage', chat_id, text: booked + response.onDedit});
        } else if (text === response.del) {
            const booked = await controller.appointment.booked(message);
            return res.status(200).send({method: 'sendMessage', chat_id, text: booked + response.onDelete});
        } else if (text === response.bedit) {
            const booked = await controller.appointment.booked(message);
            const list = await controller.service.barberList();
            return res.status(200).send({
                method: 'sendMessage',
                chat_id,
                text: booked + '\n' + list + response.onBedit
            });
        }
// commands
        else if (text.indexOf(response.l) !== -1) {
            const set = await controller.client.setLastName(text, chat_id);
            return res.status(200).send({method: 'sendMessage', chat_id, text: set});
        } else if (text.indexOf(response.m) !== -1) {
            const set = await controller.client.setEmail(text, chat_id);
            return res.status(200).send({method: 'sendMessage', chat_id, text: set});
        } else if (text.indexOf(response.check) !== -1) {
            const free = await controller.appointment.free(text);
            return res.status(200).send({method: 'sendMessage', chat_id, text: free});
        } else if (text.indexOf(response.sign) !== -1) {
            const set = await controller.appointment.set(chat_id, text);
            return res.status(200).send({method: 'sendMessage', chat_id, text: set});
        } else if (text.indexOf(response.bedit) !== -1) {
            const change = await controller.appointment.changeBarber(chat_id, text);
            return res.status(200).send({method: 'sendMessage', chat_id, text: change});
        } else if (text.indexOf(response.sedit) !== -1) {
            const change = await controller.appointment.changeService(chat_id, text);
            return res.status(200).send({method: 'sendMessage', chat_id, text: change});
        } else if ((text.indexOf(response.dedit) !== -1)) {
            const change = await controller.appointment.changeDate(chat_id, text);
            return res.status(200).send({method: 'sendMessage', chat_id, text: change});
        } else if ((text.indexOf(response.del) !== -1)) {
            const del = await controller.appointment.delete(chat_id, text);
            return res.status(200).send({method: 'sendMessage', chat_id, text: del});
        }
// buttons
        else if (text === isMenu.Back)
            return res.status(200).send({method: 'sendMessage', chat_id, text: response.onHelp});
        else if (text === isMenu.BarberList)
            return res.status(200).send({method: 'sendMessage', chat_id, text: await controller.service.barberList()});
        else if (text === isProfile.Booked)
            return res.status(200).send({
                method: 'sendMessage',
                chat_id,
                text: await controller.appointment.booked(message)
            });
        else if (text === isProfile.History)
            return res.status(200).send({
                method: 'sendMessage',
                chat_id,
                text: await controller.appointment.history(message)
            });
        else if (text === isMenu.PriceList)
            return res.status(200).send({
                method: 'sendMessage',
                chat_id,
                text: await controller.service.amenitiesList()
            });
        else if (text === isMenu.Profile)
            return res.status(200).send({
                method: 'sendMessage',
                chat_id,
                text: await controller.client.profile(message)
            });
// on start message
        else if (text === '/start') {
            const firstName = message.chat.first_name;
            await controller.client.addClient(chat_id, firstName, message.chat.last_name);
            return res.status(200).send({
                method: 'sendMessage',
                chat_id,
                text: 'Hello, ' + firstName + '. Can i help you?'
            });
        }
        return res.status(200).send({method: 'sendMessage', chat_id, text: response.onHelp});
    }
    functions.logger.log('not a telegram message');
    return res.status(200).send({status: 'not a telegram message'});
});

export const router = functions.https.onRequest(app);
