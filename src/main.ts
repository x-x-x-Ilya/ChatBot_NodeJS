import * as TelegramBot from 'node-telegram-bot-api';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Connect } from './database/synchronization';
import { LogError } from './middleware/logging';
import { Init } from './database/models';

export const bot = new TelegramBot(process.env.TOKEN, { webHook: { port: 80 } });

Bootstrap(bot);

// init app and create connection with the database, set's webHook, and webHook error's listener
async function Bootstrap(bot: TelegramBot) {
  try {
    /*
     *  Whenever there is an update for the bot, sends an HTTPS POST
     *  request to the specified url, containing a JSON-serialized Update.
     *  start ngrok http 80 for test on local machine
     */
    bot.setWebHook('https://51bd20435c75.ngrok.io/bot' + process.env.TOKEN);
    bot.on('webhook_error', (error) => {
      LogError(error.code);
    });
    await Connect();
    new Init();
    const app = await NestFactory.create(AppModule);
    await app.listen(80);
  } catch (error) {
    LogError(error);
  }
}