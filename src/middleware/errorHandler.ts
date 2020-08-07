import * as TelegramBot from 'node-telegram-bot-api';
import { logError } from './logging';

export async function onError(bot: TelegramBot): Promise<void> {
  try {
    bot.on('webhook_error', (e) => {
      logError(e + '\n code: ' + e.code);
    });
    bot.on('error', (e) => {
      logError(e);
    });

  } catch (e) {
    logError(e);
  }
}