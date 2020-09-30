import * as fs from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const functions = require("firebase-functions");

// universal function for logging all type errors
export const log = (file: string, text: any, author: string): void => {
  fs.appendFileSync(file,
    '\n' + author + ': ' +
    JSON.stringify(text, null, '\t') + ' ' + new Date());
  functions
  .logger
  .log(JSON.stringify(text, null, '\t'));
}
/** For logging:
  * User messages: log('./logs/' + id + '.txt', text, 'user');
  * Errors: log('./logs/_errors.txt', error, ' ');
  * Bot messages: log(`./logs/` + id + `.txt`, text, 'bot');
  */