//"nest start",
import * as TelegramBot from 'node-telegram-bot-api';
import { connect } from './database/synchronization';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const init = require('./database/models/index');
import { API } from './API';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const token = process.env.TOKEN;
export const bot = new TelegramBot(token);

async function bootstrap() {
  connect().then(async () => {
    try {
      bot.setWebHook('https://76f262ed68bd.ngrok.io'); //  start ngrok http 7000
      init.init();
      new API(bot);
      const app = await NestFactory.create(AppModule);
      await app.listen(7000);
    } catch (e) {
      console.log(e);
    }
  });
}

bootstrap();
