import * as TelegramBot from 'node-telegram-bot-api';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { connect } from './database/synchronization';
import { log_error } from './helpers/error-handler';
import { init } from './database/models';

export const bot = new TelegramBot(process.env.TOKEN, {
  webHook: { port: 80 }
});

/*
 *  Whenever there is an update for the bot, sends an HTTPS POST
 *  request to the specified url, containing a JSON-serialized Update.
 *  start ngrok http 80 for test on local machine
 */
bot.setWebHook('https://19df832e19e8.ngrok.io/bot' + process.env.TOKEN);

bot.on('webhook_error', (error) => {
  log_error(error.code);
});

// function init app and create connection with the database
async function bootstrap() {
  try {
    await connect();
    init.prototype.init();
    const app = await NestFactory.create(AppModule);
    await app.listen(80);
  } catch (error) {
    log_error(error);
  }
}
bootstrap();
