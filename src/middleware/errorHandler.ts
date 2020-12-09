import * as TelegramBot from 'node-telegram-bot-api';
import { log } from './logging';

// listener for bot errors
export async function onError(bot: TelegramBot): Promise<void> {
    try {
        bot.on('webhook_error', error => {
            log('./logs/_errors.txt', error + '\n code: ' + error.code, ' ');
        });
        bot.on('error', e => {
            log('./logs/_errors.txt', e, ' ');
        });
    } catch (e) {
        log('./logs/_errors.txt', e, ' ');
    }
}
