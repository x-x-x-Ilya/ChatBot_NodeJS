// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs  = require("fs");
import { log_error } from './error-handler';

export const sendMessage = (TelegramBot : any, msg : any, text : any, keyboard : any) : void => {
  fs.appendFileSync(`./logs/` + msg.chat.id + `.txt`, '\n bot: ' + JSON.stringify(text, null, '\t') + ' ' + new Date());
  TelegramBot.sendMessage(msg.chat.id, text, keyboard).catch(error => {
    log_error(error);
  });
};