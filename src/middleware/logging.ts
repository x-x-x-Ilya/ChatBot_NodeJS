import * as fs from 'fs';

// universal function for logging all type errors
export const log = (file: string, text: any, author: string): void => {
  if(author === ' ') console.log(text);
  fs.appendFileSync(file,
    '\n' + author + ': ' +
    JSON.stringify(text, null, '\t') + ' ' + new Date());
}
/** For logging:
  * User messages: log('./logs/' + id + '.txt', text, 'user');
  * Errors: log('./logs/_errors.txt', error, ' ');
  * Bot messages: log(`./logs/` + id + `.txt`, text, 'bot');
  */