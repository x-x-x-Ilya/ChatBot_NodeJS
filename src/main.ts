import * as TelegramBot from 'node-telegram-bot-api';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from './middleware/logging';
import { onError } from './middleware/errorHandler';
import { database } from './database';
import { address, errLogPath, port } from './constants';

export const bot = new TelegramBot(process.env.TOKEN, {
    webHook: { port: port },
});

async function bootstrap(bot: TelegramBot): Promise<void> {
    try {
        await bot.setWebHook(address + '/bot' + process.env.TOKEN);
        await onError(bot);
        await database();
        const app = await NestFactory.create(AppModule);
        await app.listen(port);
    } catch (error) {
        log(errLogPath, error, ' ');
    }
}

bootstrap(bot)
    .then(() => {
        console.log('Bot has been started.');
    })
    .catch((error: Error) => {
        log(errLogPath, error, ' ');
    });
