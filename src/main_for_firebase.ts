import * as functions from 'firebase-functions'
import * as express from "express";
import * as cors from 'cors'
import * as res_text from "./keyboards/helpText";
import {controller} from "./controller";
import {isMenu, isProfile, menu, profile} from "./keyboards/keyboards";
import {firebaseDatabase} from "./database/firebase";
import { Request, Response } from 'express';

// Database initialization
firebaseDatabase();
const app = express();
app.use(cors({ origin: true }));

function sendMessage(res: Response, chat_id: number, text: string, keyboard) {
    return res.status(200).send(
      {
          method: 'sendMessage',
          chat_id,
          text: text,
          reply_markup: keyboard
      });
}

app.post('/', async (req: Request, res: Response) => {
    // Variables for simple code
    const body = req.body;
    const chat_id = req.body.message.chat.id
    const message = req.body.message
    const text = req.body.message.text
    // Check is it a telegram message
    const isTelegramMessage = body && req.body.message &&
                              req.body.message.chat && chat_id &&
                              req.body.message.from &&
                              req.body.message.from.first_name
    if (isTelegramMessage) {
        if (text === res_text.l) {
            const profile = await controller.client.profile(message);
            sendMessage(res, chat_id, profile + res_text.onL, menu);
        } else if (text === res_text.sedit) {
            const booked = await controller.appointment.booked(message);
            const list = await controller.service.amenitiesList();
            sendMessage(res,
                        chat_id,
                    booked + '\n' + list + res_text.onSedit,
                        profile);
        } else if (text === res_text.m) {
            const profile = await controller.client.profile(message);
            sendMessage(res, chat_id, profile + res_text.onM, profile);
        } else if (text === res_text.check)
            sendMessage(res, chat_id, res_text.onCheck, profile);
        else if (text === res_text.sign)
            sendMessage(res, chat_id, res_text.onSign, profile);
        else if (text === res_text.dedit) {
            const booked = await controller.appointment.booked(message);
            sendMessage(res, chat_id, booked + res_text.onDedit, profile);
        } else if (text === res_text.del) {
            const booked = await controller.appointment.booked(message);
            sendMessage(res, chat_id, booked + res_text.onDelete, profile);
        } else if (text === res_text.bedit) {
            const booked = await controller.appointment.booked(message);
            const list = await controller.service.barberList();
            sendMessage(res,
                        chat_id,
                    booked + '\n' + list + res_text.onBedit,
                        menu);
        }
        // Listener for commands
        else if (text.indexOf(res_text.l) !== -1) {
            const set = await controller.client.setLastName(text, chat_id);
            sendMessage(res, chat_id, set, menu);
        } else if (text.indexOf(res_text.m) !== -1) {
            const set = await controller.client.setEmail(text, chat_id);
            sendMessage(res, chat_id, set, menu);
        } else if (text.indexOf(res_text.check) !== -1) {
            const free = await controller.appointment.free(text);
            sendMessage(res, chat_id, free, menu);
        } else if (text.indexOf(res_text.sign) !== -1) {
            const set = await controller.appointment.set(chat_id, text);
            sendMessage(res, chat_id, set, menu);
        } else if (text.indexOf(res_text.bedit) !== -1) {
            const change =
              await controller.appointment.changeBarber(chat_id, text);
            sendMessage(res, chat_id, change, menu);
        } else if (text.indexOf(res_text.sedit) !== -1) {
            const change =
              await controller.appointment.changeService(chat_id, text);
            sendMessage(res, chat_id, change, menu);
        } else if ((text.indexOf(res_text.dedit) !== -1)) {
            const change =
              await controller.appointment.changeDate(chat_id, text);
            sendMessage(res, chat_id, change, menu);
        } else if ((text.indexOf(res_text.del) !== -1)) {
            const del = await controller.appointment.delete(chat_id, text);
            sendMessage(res, chat_id, del, menu);
        }
        // Listener for buttons
        else if (text === isMenu.Back)
            sendMessage(res, chat_id, res_text.onHelp, menu);
        else if (text === isMenu.BarberList)
            sendMessage(res,
                        chat_id,
                        await controller.service.barberList(),
                        menu);
        else if (text === isProfile.Booked)
            sendMessage(res,
                        chat_id,
                        await controller.appointment.booked(message),
                        menu);
        else if (text === isProfile.History)
            sendMessage(res,
                        chat_id,
                        await controller.appointment.history(message),
                        menu);
        else if (text === isMenu.PriceList)
            sendMessage(res,
                        chat_id,
                        await controller.service.amenitiesList(),
                        menu);
        else if (text === isMenu.Profile)
            sendMessage(res,
                        chat_id,
                        await controller.client.profile(message),
                        menu);
        // Listener for start message
        else if (text === '/start') {
            const firstName = message.chat.first_name;
            await controller.client.addClient(chat_id,
                                              firstName,
                                              message.chat.last_name);
            sendMessage(res,
                        chat_id,
                    'Hello, ' + firstName + '. Can i help you?',
                        menu);
        }
        sendMessage(res, chat_id, res_text.onHelp, menu);
    }
    functions.logger.log('not a telegram message');
    return res.status(200).send(
      { status: 'not a telegram message' });
});

export const router = functions.https.onRequest(app);
