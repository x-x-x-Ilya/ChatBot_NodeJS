import * as TelegramBot from 'node-telegram-bot-api';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from './middleware/logging';
import { onError} from './middleware/errorHandler';
import { database } from './database';

// use "ngrok http 80" to get address
const address = 'https://6b7a1664a1f2.ngrok.io';
const port = 80;

export const bot = new TelegramBot(process.env.TOKEN,
  { webHook: { port: port } });

bootstrap(bot).then(() => {
 console.log('Bot has been started.');
});

async function bootstrap(bot: TelegramBot): Promise<void> {
  try {
    // bot
    await bot.setWebHook(address + '/bot' + process.env.TOKEN);
    await onError(bot);
    // database
    await database();
    // app
    const app = await NestFactory.create(AppModule);
    await app.listen(port);
  } catch (error) {
    log('./logs/_errors.txt', error, ' ');
  }
}
