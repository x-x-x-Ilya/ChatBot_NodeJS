import * as fs from 'fs';
import { Update } from './TelegramClasses'; // Node.js module for working with files in Node.js

// for logging user messages
export const logUser = (update: Update): void  => {
  console.log(update);
  fs.appendFileSync('./logs/' + update.message.chat.id + '.txt', '\n user: ' + JSON.stringify(update.message.text, null, '\t') + ' ' + new Date());
}

// for logging errors
export function logError(error: string | JSON) : void {
  console.log(error);
  fs.appendFileSync('./logs/_errors.txt', JSON.stringify(error, null, '\t') + ' ' + new Date());
}

// for logging bot messages
export const logBot = (id: number, text: string | JSON): void  => {
  fs.appendFileSync(`./logs/` + id + `.txt`, '\n bot: ' + JSON.stringify(text, null, '\t') + ' ' + new Date());
}



