import * as TelegramBot from 'node-telegram-bot-api';
import { log } from './logging';

// listener for bot errors
export async function onError(bot: TelegramBot): Promise<void> {
  try {
    bot
    .on('webhook_error', 
    (e) => {
      log('./logs/_errors.txt', e + '\n code: ' + e.code, ' ');
    });
    bot
    .on('error', 
    (e) => {
      log('./logs/_errors.txt', e, ' ');
    });

  } catch (e) {
    log('./logs/_errors.txt', e, ' ');
  }
}