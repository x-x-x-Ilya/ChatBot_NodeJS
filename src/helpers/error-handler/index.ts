import fs from "fs";

export function log_error(error : string | JSON) : any {
  console.log(error);
  fs.appendFileSync('./logs/_errors.txt', JSON.stringify(error, null, '\t') + ' ' + new Date());
}