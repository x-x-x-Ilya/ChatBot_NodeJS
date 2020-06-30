//"nest start",

import * as TelegramBot from 'node-telegram-bot-api';
import {connect} from './database/synchronization';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const init = require('./database/models/index');
const token = process.env.TOKEN;

connect().then( () => {
  init.init();
});
export const bot = new TelegramBot(token);
bot.setWebHook('https://df026f8095dd.ngrok.io');

bot.on('message', async msg => {
  bot.sendMessage(msg.chat.id, 'Hello world', menu);
});

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { menu } from './keyboards/keyboards';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(7000);
}
bootstrap();





/*
import * as TelegramBot from 'node-telegram-bot-api';
import {connect} from './database/synchronization';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const init = require('./database/models/index');
import { API } from './API';
const token = process.env.TOKEN;

connect().then(() => {
  try {
    init.init();
    const bot: TelegramBot = new TelegramBot(token, { polling: true });

    bot.on('polling_error', (error) => {
      console.log(error.code);
    });

    new API(bot);
  } catch (e) {
    console.log(e);
  }
});

*/


