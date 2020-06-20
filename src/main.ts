//------------------------------------------------------------------
import * as admin from 'firebase-admin';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require(process.env.KEY_PATH);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://barber-shop-80244.firebaseio.com"
});
//------------------------------------------------------------------

import * as TelegramBot from 'node-telegram-bot-api';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const database = require('./database/synchronization');
import {API} from './route/API';

const token = process.env.TOKEN;
// Create a bot that uses 'polling' to fetch new updates
export const bot = new TelegramBot(token, {polling: true});

database.authentication();
database.ModelsSynchronization();
new API(bot);
