import { LogBot, LogError } from './logging';
import { bot } from '../main';
import { ReplyKeyboardMarkup } from './TelegramClasses';

export const Send = (id : number, text : string, keyboard : ReplyKeyboardMarkup) : void => {
  LogBot(id, text);
  bot.sendMessage(id, text, keyboard).catch(error => {
    LogError(error);
  });
};
