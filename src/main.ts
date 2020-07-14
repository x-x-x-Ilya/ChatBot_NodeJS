import * as TelegramBot from 'node-telegram-bot-api';
import { connect } from './database/synchronization';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const init = require('./database/models/index');
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import fs from "fs";

export const bot = new TelegramBot(process.env.TOKEN, {
  webHook: {
    port: 80
  }
});

// start ngrok http 80 for test on local machine
const address = 'https://1d445b6a5401.ngrok.io/bot' + process.env.TOKEN;

async function bootstrap() {
  connect().then(async () => {
    try {
      bot.setWebHook(address);
      bot.on('webhook_error', (error) => {
        console.log(error.code);
        fs.appendFileSync('./logs/_errors.txt',JSON.stringify( error, null, '\t') + ' ' + new Date());
      });
      init.init();
      const app = await NestFactory.create(AppModule);
      await app.listen(80);
    } catch (e) {
      console.log(e);
    }
  });
}
bootstrap();