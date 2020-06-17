export class API {
  constructor(TelegramBot) {
    TelegramBot.onText(/\/start/, function onStart(msg) {
      const opts = {
        reply_markup: JSON.stringify({
          keyboard: [
            ['Show price list'],
            ['Sign up for a service'],
            ['Enter email address - for mailing']
          ]
        })
      };
      TelegramBot.sendMessage(msg.chat.id, 'Hello, i am Barber Bot. Can i help you?', opts);
    });

    TelegramBot.onText(/Sign up for a service/, function onService(msg) {
      const opts = {
        reply_markup: JSON.stringify({
          keyboard: [
            ['Back']
          ]
        })
      };
      TelegramBot.sendMessage(msg.chat.id, 'Lets start', opts);
    });

    TelegramBot.onText(/Show price list/, function onPriceList(msg) {
      const opts = {
        reply_markup: JSON.stringify({
          keyboard: [
            ['Back'],
          ]
        })
      };
      TelegramBot.sendMessage(msg.chat.id, 'Price list:', opts);
    });

    TelegramBot.onText(/Enter email address - for mailing/, function onEmail(msg) {
      const opts = {
        reply_markup: JSON.stringify({
          keyboard: [
            ['Send'],
            ['Back']
          ]
        })
      };
      TelegramBot.sendMessage(msg.chat.id,"Enter your email", opts);
    });

    TelegramBot.onText(/Back/, function onBack(msg) {
      const opts = {
        reply_markup: JSON.stringify({
          keyboard: [
            ['Show price list'],
            ['Sign up for a service'],
            ['Enter email address - for mailing']
          ]
        })
      };
      TelegramBot.sendMessage(msg.chat.id,'menu:',opts);
    });
  }
}