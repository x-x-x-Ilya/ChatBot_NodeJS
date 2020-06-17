/*import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(7000);
}
bootstrap();
*/
//import { AppModule } from './module/app.module';


// eslint-disable-next-line @typescript-eslint/no-var-requires
const TelegramBot = require('node-telegram-bot-api');
const token = '1190153622:AAH7cRaOu4zbiTR_LEfQ5fL3riXr8EU_4hY';

// Create a bot that uses 'polling' to fetch new updates
export const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, function onStart(msg) {
  const opts = {
    reply_markup: JSON.stringify({
      keyboard: [
        ['Show price list'],
        ['Sign up for a service'],
        ['Enter email address - for mailing']
      ]
    })
  };
  bot.sendMessage(msg.chat.id, 'Hello, i am Barber Bot. Can i help you?', opts);
});

bot.onText(/Sign up for a service/, function onService(msg) {
  const opts = {
    reply_markup: JSON.stringify({
      keyboard: [
        ['Back']
      ]
    })
  };
  bot.sendMessage(msg.chat.id, 'Lets start', opts);
});

bot.onText(/Show price list/, function onPriceList(msg) {
  const opts = {
    reply_markup: JSON.stringify({
      keyboard: [
        ['Back'],
      ]
    })
  };
  bot.sendMessage(msg.chat.id, 'Price list:', opts);
});

bot.onText(/Enter email address - for mailing/, function onEmail(msg) {
  const opts = {
    reply_markup: JSON.stringify({
      keyboard: [
        ['Send'],
        ['Back']
      ]
    })
  };
  bot.sendMessage(msg.chat.id,"Enter your email", opts);
});

bot.onText(/Back/, function onBack(msg) {
  const opts = {
    reply_markup: JSON.stringify({
      keyboard: [
        ['Show price list'],
        ['Sign up for a service'],
        ['Enter email address - for mailing']
      ]
    })
  };
  bot.sendMessage(msg.chat.id,'menu:',opts);
});

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