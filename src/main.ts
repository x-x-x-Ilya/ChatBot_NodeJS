import * as TelegramBot from 'node-telegram-bot-api';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connect } from './database/synchronization';
import { logError } from './middleware/logging';
import { Init } from './database/models';
import { firebaseDatabase } from './database/firebase';
import { dbAutoBackUp } from './database/backup';

export const bot = new TelegramBot(process.env.TOKEN,
  { webHook: { port: 80 } });

bootstrap(bot);

// app launch
async function bootstrap(bot: TelegramBot) {
  try {
    await botSetup(bot);
    await connect();
    new Init();
    const app = await NestFactory.create(AppModule);
    await app.listen(80);
    firebaseDatabase();
    dbAutoBackUp();
  } catch (error) {
    logError(error);
  }
}

async function botSetup(bot: TelegramBot) {
  try {
    /**
     *  Whenever there is an update for the bot, sends an HTTPS POST
     *  request to the specified url, containing a JSON-serialized Update.
     */
    bot.setWebHook('https://b4271aa7a89c.ngrok.io/bot' + process.env.TOKEN);
    bot.on('webhook_error', (error) => {
      logError(error);
    });
  } catch (e) {
    logError(e);
  }
}
