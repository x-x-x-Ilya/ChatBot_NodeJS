import * as TelegramBot from 'node-telegram-bot-api';
import { log } from './logging';
import { webhook_error, errLogPath } from '../constants';

// listener for bot errors
export async function onError(bot: TelegramBot): Promise<void> {
    try {
        bot.on(webhook_error, error => {
            log(errLogPath, error + '\n code: ' + error.code, ' ');
        });
        bot.on('error', e => {
            log(errLogPath, e, ' ');
        });
    } catch (e) {
        log(errLogPath, e, ' ');
    }
}
