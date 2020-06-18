/*import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(7000);
}
bootstrap();
*/

// eslint-disable-next-line @typescript-eslint/no-var-requires
const API = require('./route/route');

import * as admin from 'firebase-admin';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require(process.env.KEY_PATH);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://barber-shop-80244.firebaseio.com"
});


// eslint-disable-next-line @typescript-eslint/no-var-requires
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN;
// Create a bot that uses 'polling' to fetch new updates
export const bot = new TelegramBot(token, {polling: true});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const connect = require('./database/synchronization');
connect.authentication();
connect.ModelsSynchronization();

new API.API(bot);

/*
// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});


bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Hello World!!!');
});

 */