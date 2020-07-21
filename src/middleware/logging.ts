import * as fs from 'fs'; // Node.js module for working with files in Node.js

// for logging user messages
export const log_user = (update : any)  => {
  console.log(update);
  fs.appendFileSync('./logs/' + update.message.chat.id + '.txt', '\n user: ' + JSON.stringify(update.message.text, null, '\t') + ' ' + new Date());
}

// for logging errors
export function log_error(error : string | JSON) : any {
  console.log(error);
  fs.appendFileSync('./logs/_errors.txt', JSON.stringify(error, null, '\t') + ' ' + new Date());
}

// for logging bot messages
export const log_bot = (id, text: any)  => {
  fs.appendFileSync(`./logs/` + id + `.txt`, '\n bot: ' + JSON.stringify(text, null, '\t') + ' ' + new Date());
}



