// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");

export const log = (update : any)  => {
  fs.appendFileSync('./logs/' + update.message.chat.id + '.txt', '\n user: ' + JSON.stringify(update.message.text, null, '\t') + ' ' + new Date());
}