import * as functions from 'firebase-functions'
import * as express from "express";
import * as cors from 'cors'
import * as res_text from "./keyboards/helpText";
import {c} from "./controller";
import {isMenu, isProfile, menu, profile} from "./keyboards/keyboards";
import {firebaseDatabase} from "./database/firebase";
import { Request, Response } from 'express';

// database initialization
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
    // variables for simple code
    const body = req.body;
    const chat_id = req.body.message.chat.id
    const msg = req.body.message
    const text = req.body.message.text
    // check is it a telegram message
    const isTelegramMessage = body && req.body.message &&
      req.body.message.chat && chat_id &&
      req.body.message.from &&
      req.body.message.from.first_name
    if (isTelegramMessage) {
        if (text === res_text.l)
            sendMessage(res, chat_id,
              await c.client.profile(msg) + res_text.onL, menu);
        else if (text === res_text.sedit)
            sendMessage(res, chat_id, await c.appointment.booked(msg) +
              '\n' + await c.service.amenitiesList() + res_text.onSedit, profile);
        else if (text === res_text.m)
            sendMessage(res, chat_id, await c.client.profile(msg) +
              res_text.onM, profile);
        else if (text === res_text.check)
            sendMessage(res, chat_id, res_text.onCheck, profile);
        else if (text === res_text.sign)
            sendMessage(res, chat_id, res_text.onSign, profile);
        else if (text === res_text.dedit)
            sendMessage(res, chat_id, await c.appointment.booked(msg)
              + res_text.onDedit, profile);
        else if (text === res_text.del)
            sendMessage(res, chat_id, await c.appointment.booked(msg)
              + res_text.onDelete, profile);
        else if (text === res_text.bedit)
            sendMessage(res,
              chat_id,
              await c.appointment.booked(msg) + '\n' +
              await c.service.barberList() + res_text.onBedit,
              menu);
        // listener for commands
        else if (text.indexOf(res_text.l) !== -1)
            sendMessage(res, chat_id,
              await c.client.setLastName(text, chat_id), menu);
        else if (text.indexOf(res_text.m) !== -1)
            sendMessage(res, chat_id,
              await c.client.setEmail(text, chat_id), menu);
        else if (text.indexOf(res_text.check) !== -1)
            sendMessage(res, chat_id, await c.appointment.free(text), menu);
        else if (text.indexOf(res_text.sign) !== -1)
            sendMessage(res, chat_id,
              await c.appointment.set(chat_id, text), menu);
        else if (text.indexOf(res_text.bedit) !== -1)
            sendMessage(res, chat_id,
              await c.appointment.changeBarber(chat_id, text), menu);
        else if (text.indexOf(res_text.sedit) !== -1)
            sendMessage(res, chat_id,
              await c.appointment.changeService(chat_id, text), menu);
        else if ((text.indexOf(res_text.dedit) !== -1))
            sendMessage(res, chat_id,
              await c.appointment.changeDate(chat_id, text), menu);
        else if ((text.indexOf(res_text.del) !== -1))
            sendMessage(res, chat_id,
              await c.appointment.delete(chat_id, text), menu);
        // listener for buttons
        else if (text === isMenu.Back)
            sendMessage(res, chat_id, res_text.onHelp, menu);
        else if (text === isMenu.BarberList)
            sendMessage(res, chat_id, await c.service.barberList(), menu);
        else if (text === isProfile.Booked)
            sendMessage(res, chat_id, await c.appointment.booked(msg), menu);
        else if (text === isProfile.History)
            sendMessage(res, chat_id, await c.appointment.history(msg), menu);
        else if (text === isMenu.PriceList)
            sendMessage(res, chat_id, await c.service.amenitiesList(), menu);
        else if (text === isMenu.Profile)
            sendMessage(res, chat_id, await c.client.profile(msg), menu);
        // listener for start message
        else if (text === '/start') {
            await c.client.addClient(chat_id, msg.chat.first_name,
              msg.chat.last_name);
            sendMessage(res, chat_id, 'Hello, ' + msg.chat.first_name +
              '. Can i help you?', menu);
        }
        sendMessage(res, chat_id, res_text.onHelp, menu);
    }
    functions.logger.log('not a telegram message');
    return res.status(200).send(
      { status: 'not a telegram message' });
});

export const router = functions.https.onRequest(app);
