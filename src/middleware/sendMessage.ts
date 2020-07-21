import { LogBot, LogError } from './logging';
import { bot } from '../main';

export const Send = (id : number, text : string, keyboard : any) : void => {
  LogBot(id, text);
  bot.sendMessage(id, text, keyboard).catch(error => {
    LogError(error);
  });
};
