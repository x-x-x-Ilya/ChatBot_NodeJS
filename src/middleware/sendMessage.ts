import { log_bot, log_error } from './logging';
import { bot } from '../main';

export const send = (id : number, text : string, keyboard : any) : void => {
  bot.sendMessage(id, text, keyboard).catch(error => {
    log_bot(id, text);
    log_error(error);
  });
};
