import * as fs from 'fs';

// for logging user messages
export const logUser = (id: number, text: string): void  => {
  fs.appendFileSync(
    './logs/' + id + '.txt',
    '\n user: ' +
    JSON.stringify(text, null, '\t') + ' ' + new Date());
}

// for logging errors
export function logError(error: string | JSON) : void {
  console.log(error);
  fs.appendFileSync(
    './logs/_errors.txt',
    '\n' + JSON.stringify(error, null, '\t') + ' ' + new Date());
}

// for logging bot messages
export const logBot = (id: number, text: string | JSON): void  => {
  fs.appendFileSync(
    `./logs/` + id + `.txt`,
    '\n bot: ' +
    JSON.stringify(text, null, '\t') + ' ' + new Date());
}



