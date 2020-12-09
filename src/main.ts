import * as TelegramBot from 'node-telegram-bot-api';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from './middleware/logging';
import { onError } from './middleware/errorHandler';
import { database } from './database';

// use "ngrok http 80" to get address for local work
const address =
    'https://' +
    'us-central1-barber-shop-b2a01.cloudfunctions.net/' +
    'helloWorld';
const port = 80;

// bot exemplar
export const bot = new TelegramBot(process.env.TOKEN, {
    webHook: { port: port },
});

// main function
async function bootstrap(bot: TelegramBot): Promise<void> {
    try {
        await bot.setWebHook(address + '/bot' + process.env.TOKEN);
        await onError(bot);
        await database();
        const app = await NestFactory.create(AppModule);
        await app.listen(port);
    } catch (error) {
        log('./logs/_errors.txt', error, ' ');
    }
}

bootstrap(bot)
    .then(() => {
        console.log('Bot has been started.');
    })
    .catch((error: Error) => {
        console.log(error);
    });
