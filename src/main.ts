/*import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(7000);
}
bootstrap();
*/
//------------------------------------------------------------------
import * as admin from 'firebase-admin';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require(process.env.KEY_PATH);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://barber-shop-80244.firebaseio.com"
});
//------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-var-requires
const database = require('./database/synchronization');
import {API} from './route/route';
import * as TelegramBot from 'node-telegram-bot-api';
const token = process.env.TOKEN;
// Create a bot that uses 'polling' to fetch new updates
export const bot = new TelegramBot(token, {polling: true});

database.authentication();
database.ModelsSynchronization();
new API(bot);
