import * as fs from 'fs';

export const log = (file: string,
                    text: string | any,
                    author: string): void => {
  if(author === ' ') console.log(text);
  fs.appendFileSync(file,
    '\n' + author + ': ' +
    JSON.stringify(text, null, '\t') + ' ' + new Date());
}
// for logging user messages: log('./logs/' + id + '.txt', text, 'user');
// for logging errors: log('./logs/_errors.txt', error, ' ');
// for logging bot messages: log(`./logs/` + id + `.txt`, text, 'bot');