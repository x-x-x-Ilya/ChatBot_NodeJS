import * as TelegramBot from 'node-telegram-bot-api';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connect } from './database/synchronization';
import { logError } from './middleware/logging';
import { Init } from './database/models';
import { firebaseDatabase } from './database/firebase';
import { job } from './database/backup';
import { onError} from './middleware/errorHandler';

const port = 80;
const address = '';   // use "ngrok http 80" to get address

export const bot = new TelegramBot(process.env.TOKEN,
  { webHook: { port: port } });

bootstrap(bot).then(() => {
 console.log('bot has been started');
});

async function bootstrap(bot: TelegramBot): Promise<void> {
  try {
    // bot
    await bot.setWebHook(address + '/bot' + process.env.TOKEN);
    await onError(bot);
    // database
    await connect();
    await new Init();
    await firebaseDatabase();
    await job.start();
    // app
    const app = await NestFactory.create(AppModule);
    await app.listen(port);
  } catch (error) {
    logError(error);
  }
}
