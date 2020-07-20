// Node.js module for working with files in Node.js
import fs from "fs";

// function for logging errors
export function log_error(error : string | JSON) : any {
  console.log(error);
  fs.appendFileSync('./logs/_errors.txt', JSON.stringify(error, null, '\t') + ' ' + new Date());
}