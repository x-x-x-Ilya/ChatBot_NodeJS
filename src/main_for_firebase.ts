import * as functions from 'firebase-functions'
import * as express from "express";
import * as cors from 'cors'
import * as response from "./keyboards/helpText";
import {controller} from "./controller";
import {isMenu, isProfile, menu, profile} from "./keyboards/keyboards";
import {firebaseDatabase} from "./database/firebase";

// Database initialization
firebaseDatabase();
const app = express();
app.use(cors({ origin: true }));

function sendMessage(res, chat_id, text, keyboard) {
    return res.status(200).send({method: 'sendMessage', chat_id, text: text, reply_markup: keyboard});
}

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
            const profile = await controller.client.profile(message);
            sendMessage(res, chat_id, profile + response.onL, menu);
        } else if (text === response.sedit) {
            const booked = await controller.appointment.booked(message);
            const list = await controller.service.amenitiesList();
            sendMessage(res, chat_id, booked + '\n' + list + response.onSedit, profile);
        } else if (text === response.m) {
            const profile = await controller.client.profile(message);
            sendMessage(res, chat_id, profile + response.onM, profile);
        } else if (text === response.check)
            sendMessage(res, chat_id, response.onCheck, profile);
        else if (text === response.sign)
            sendMessage(res, chat_id, response.onSign, profile);
        else if (text === response.dedit) {
            const booked = await controller.appointment.booked(message);
            sendMessage(res, chat_id, booked + response.onDedit, profile);
        } else if (text === response.del) {
            const booked = await controller.appointment.booked(message);
            sendMessage(res, chat_id, booked + response.onDelete, profile);
        } else if (text === response.bedit) {
            const booked = await controller.appointment.booked(message);
            const list = await controller.service.barberList();
            sendMessage(res, chat_id, booked + '\n' + list + response.onBedit, menu);
        }
        // Listener for commands
        else if (text.indexOf(response.l) !== -1) {
            const set = await controller.client.setLastName(text, chat_id);
            sendMessage(res, chat_id, set, menu);
        } else if (text.indexOf(response.m) !== -1) {
            const set = await controller.client.setEmail(text, chat_id);
            sendMessage(res, chat_id, set, menu);
        } else if (text.indexOf(response.check) !== -1) {
            const free = await controller.appointment.free(text);
            sendMessage(res, chat_id, free, menu);
        } else if (text.indexOf(response.sign) !== -1) {
            const set = await controller.appointment.set(chat_id, text);
            sendMessage(res, chat_id, set, menu);
        } else if (text.indexOf(response.bedit) !== -1) {
            const change = await controller.appointment.changeBarber(chat_id, text);
            sendMessage(res, chat_id, change, menu);
        } else if (text.indexOf(response.sedit) !== -1) {
            const change = await controller.appointment.changeService(chat_id, text);
            sendMessage(res, chat_id, change, menu);
        } else if ((text.indexOf(response.dedit) !== -1)) {
            const change = await controller.appointment.changeDate(chat_id, text);
            sendMessage(res, chat_id, change, menu);
        } else if ((text.indexOf(response.del) !== -1)) {
            const del = await controller.appointment.delete(chat_id, text);
            sendMessage(res, chat_id, del, menu);
        }
        // Listener for buttons
        else if (text === isMenu.Back)
            sendMessage(res, chat_id, response.onHelp, menu);
        else if (text === isMenu.BarberList)
            sendMessage(res, chat_id, await controller.service.barberList(), menu);
        else if (text === isProfile.Booked)
            sendMessage(res, chat_id, await controller.appointment.booked(message), menu);
        else if (text === isProfile.History)
            sendMessage(res, chat_id, await controller.appointment.history(message), menu);
        else if (text === isMenu.PriceList)
            sendMessage(res, chat_id, await controller.service.amenitiesList(), menu);
        else if (text === isMenu.Profile)
            sendMessage(res, chat_id, await controller.client.profile(message), menu);
        // Listener for start message
        else if (text === '/start') {
            const firstName = message.chat.first_name;
            await controller.client.addClient(chat_id, firstName, message.chat.last_name);
            sendMessage(res, chat_id, 'Hello, ' + firstName + '. Can i help you?', menu);
        }
        sendMessage(res, chat_id, response.onHelp, menu);
    }
    functions.logger.log('not a telegram message');
    return res.status(200).send({ status: 'not a telegram message' });
});

export const router = functions.https.onRequest(app);
