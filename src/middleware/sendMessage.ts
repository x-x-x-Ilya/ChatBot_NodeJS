import { log } from './logging';
import { bot } from '../main';

export const send = (id: number, text: string, keyboard: any): void => {
  log(`./logs/` + id + `.txt`, text, 'bot');
  bot.sendMessage(id, text, keyboard).catch(error => {
    log('./logs/_errors.txt', error, ' ');
  });
};
