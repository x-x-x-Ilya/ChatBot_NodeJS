/*import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(7000);
}
bootstrap();
*/

// eslint-disable-next-line @typescript-eslint/no-var-requires
const API = require('./routes/route');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const TelegramBot = require('node-telegram-bot-api');
const token = '1190153622:AAH7cRaOu4zbiTR_LEfQ5fL3riXr8EU_4hY';
// Create a bot that uses 'polling' to fetch new updates
export const bot = new TelegramBot(token, {polling: true});
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