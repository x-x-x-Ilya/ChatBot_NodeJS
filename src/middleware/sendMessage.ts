import { logBot, logError } from './logging';
import { bot } from '../main';

export const send = (id: number, text: string, keyboard: any): void => {
  logBot(id, text);
  bot.sendMessage(id, text, keyboard).catch(error => {
    logError(error);
  });
};
