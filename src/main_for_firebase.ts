import * as functions from 'firebase-functions'
import * as express from "express";
import * as cors from 'cors'
import * as response from "./keyboards/helpText";
import {controller} from "./controller";
import {isMenu, isProfile, menu, profile} from "./keyboards/keyboards";
import {firebaseDatabase} from "./database/firebase";

// Database initialization
firebaseDatabase();
const app = express()
app.use(cors({ origin: true }))

app.post('/', async (req, res) => {
    // Check is it a telegram message
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
        if (text === response.l) {
            // tslint:disable-next-line:no-shadowed-variable
            const profile = await controller.client.profile(message);
            return res.status(200).send(
              {
                  method: 'sendMessage',
                  chat_id: chat_id,
                  text: profile + response.onL,
                  reply_markup: menu
              })
        } else if (text === response.sedit) {
            const booked = await controller.appointment.booked(message);
            const list = await controller.service.amenitiesList();
            return res.status(200).send({method: 'sendMessage', chat_id, text: booked + '\n' + list + response.onSedit, reply_markup: profile});
        } else if (text === response.m) {
            // tslint:disable-next-line:no-shadowed-variable
            const profile = await controller.client.profile(message);
            return res.status(200).send({method: 'sendMessage', chat_id, text: profile + response.onM, reply_markup: profile});
        } else if (text === response.check)
            return res.status(200).send({method: 'sendMessage', chat_id, text: response.onCheck, reply_markup: profile});
        else if (text === response.sign)
            return res.status(200).send({method: 'sendMessage', chat_id, text: response.onSign, reply_markup: profile});
        else if (text === response.dedit) {
            const booked = await controller.appointment.booked(message);
            return res.status(200).send({method: 'sendMessage', chat_id, text: booked + response.onDedit, reply_markup: profile});
        } else if (text === response.del) {
            const booked = await controller.appointment.booked(message);
            return res.status(200).send({method: 'sendMessage', chat_id, text: booked + response.onDelete, reply_markup: profile});
        } else if (text === response.bedit) {
            const booked = await controller.appointment.booked(message);
            const list = await controller.service.barberList();
            return res.status(200).send({
                method: 'sendMessage',
                chat_id,
                text: booked + '\n' + list + response.onBedit, reply_markup: menu
            });
        }
// commands
        else if (text.indexOf(response.l) !== -1) {
            const set = await controller.client.setLastName(text, chat_id);
            return res.status(200).send({method: 'sendMessage', chat_id, text: set, reply_markup: menu});
        } else if (text.indexOf(response.m) !== -1) {
            const set = await controller.client.setEmail(text, chat_id);
            return res.status(200).send({method: 'sendMessage', chat_id, text: set, reply_markup: menu});
        } else if (text.indexOf(response.check) !== -1) {
            const free = await controller.appointment.free(text);
            return res.status(200).send({method: 'sendMessage', chat_id, text: free, reply_markup: menu});
        } else if (text.indexOf(response.sign) !== -1) {
            const set = await controller.appointment.set(chat_id, text);
            return res.status(200).send({method: 'sendMessage', chat_id, text: set, reply_markup: menu});
        } else if (text.indexOf(response.bedit) !== -1) {
            const change = await controller.appointment.changeBarber(chat_id, text);
            return res.status(200).send({method: 'sendMessage', chat_id, text: change, reply_markup: menu});
        } else if (text.indexOf(response.sedit) !== -1) {
            const change = await controller.appointment.changeService(chat_id, text);
            return res.status(200).send({method: 'sendMessage', chat_id, text: change, reply_markup: menu});
        } else if ((text.indexOf(response.dedit) !== -1)) {
            const change = await controller.appointment.changeDate(chat_id, text);
            return res.status(200).send({method: 'sendMessage', chat_id, text: change, reply_markup: menu});
        } else if ((text.indexOf(response.del) !== -1)) {
            const del = await controller.appointment.delete(chat_id, text);
            return res.status(200).send({method: 'sendMessage', chat_id, text: del, reply_markup: menu});
        }
// buttons
        else if (text === isMenu.Back)
            return res.status(200).send({method: 'sendMessage', chat_id, text: response.onHelp, reply_markup: menu});
        else if (text === isMenu.BarberList)
            return res.status(200).send({method: 'sendMessage', chat_id, text: await controller.service.barberList(), reply_markup: menu});
        else if (text === isProfile.Booked)
            return res.status(200).send({
                method: 'sendMessage',
                chat_id,
                text: await controller.appointment.booked(message), reply_markup: menu
            });
        else if (text === isProfile.History)
            return res.status(200).send({
                method: 'sendMessage',
                chat_id,
                text: await controller.appointment.history(message), reply_markup: menu
            });
        else if (text === isMenu.PriceList)
            return res.status(200).send({
                method: 'sendMessage',
                chat_id,
                text: await controller.service.amenitiesList(), reply_markup: menu
            });
        else if (text === isMenu.Profile)
            return res.status(200).send({
                method: 'sendMessage',
                chat_id,
                text: await controller.client.profile(message), reply_markup: profile
            });
// on start message
        else if (text === '/start') {
            const firstName = message.chat.first_name;
            await controller.client.addClient(chat_id, firstName, message.chat.last_name);
            return res.status(200).send({
                method: 'sendMessage',
                chat_id,
                text: 'Hello, ' + firstName + '. Can i help you?', reply_markup: menu
            });
        }
        return res.status(200).send({method: 'sendMessage', chat_id, text: response.onHelp, reply_markup: menu});
    }
    functions.logger.log('not a telegram message');
    return res.status(200).send({status: 'not a telegram message'});
});

export const router = functions.https.onRequest(app);
