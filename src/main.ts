//"nest start",
/*
import * as admin from 'firebase-admin';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require(process.env.KEY_PATH);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://barber-shop-80244.firebaseio.com"
});
 */

import * as TelegramBot from 'node-telegram-bot-api';
import {connect} from './database/synchronization';

import {API} from './API';
// сделать последовательное выполнение так как функции асинхронные
const token = process.env.TOKEN;
connect().then(() => {
  try {
    const bot = new TelegramBot(token, { polling: true });
    new API(bot);
  } catch (e) {
    console.log(e);
  }
});

