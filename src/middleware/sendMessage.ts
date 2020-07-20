import { log_bot, log_error } from './logging';

export const sendMessage = (TelegramBot : any, msg : any, text : any, keyboard : any) : void => {

  TelegramBot.sendMessage(msg.chat.id, text, keyboard).catch(error => {
    log_bot(msg.chat.id, text);
    log_error(error);
  });
};