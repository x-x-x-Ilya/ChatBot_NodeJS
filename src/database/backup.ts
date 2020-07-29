//import { exec } from 'child_process';

/*
exec(cmd);
$ pg_dump -h localhost -p 5432 -d barbershop -U postgres > D:\test\test.sql
$ Пароль:
*/
import { spawn } from 'child_process';

const exec = require('child_process').exec;

import * as fs from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const _ = require('lodash');

const dbOptions =  {
  user: process.env.USER_NAME,
  pass: process.env.DB_PASS,
  host: process.env.HOST,
  port: 5432,
  database: process.env.DB_NAME,
  autoBackup: true,
  removeOldBackup: true,
  keepLastDaysBackup: 2,
  autoBackupPath: 'C:\\project\\ChatBot_NodeJS\\PostgresSQL.sql'
};

//return date object;

function stringToDate(dateString) {
  return new Date(dateString);
}

function  empty(mixedVar){
  let undef, key, i, len;
  const emptyValues = [undef, null, false, 0, '', '0'];
  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixedVar === emptyValues[i]) {
      return true;
    }
  }
  if (typeof mixedVar === 'object') {
    for (key in mixedVar) {
      return false;
    }
    return true;
  }
  return false;
};


function dbAutoBackUp() {
// check for auto backup is enabled or disabled
  if (dbOptions.autoBackup == true) {
    const date = new Date();
    let beforeDate, oldBackupDir, oldBackupPath;
    const currentDate = stringToDate(date); // Current date
    const newBackupDir = currentDate.getFullYear() + '-' +
                        (currentDate.getMonth() + 1) + '-' +
                         currentDate.getDate();
    // New backup path for current backup process
    const newBackupPath = dbOptions.autoBackupPath +
                          'psql-' + newBackupDir + '.sql';
    // check for remove old backup after keeping # of days given in conf
    if (dbOptions.removeOldBackup == true) {
      beforeDate = _.clone(currentDate);
      // Substract number of days to keep backup and remove old backup
      beforeDate.setDate(beforeDate.getDate() - dbOptions.keepLastDaysBackup);
      oldBackupDir = beforeDate.getFullYear() + '-' +
                    (beforeDate.getMonth() + 1) + '-' +
                     beforeDate.getDate();
      // old backup(after keeping # of days)
      oldBackupPath = dbOptions.autoBackupPath +
                      'psql-' + oldBackupDir;
    }
    // Command for mongodb dump process
    const cmd = 'pg_dump' +
                ' -h ' + dbOptions.host +
                ' -p ' + dbOptions.port +
                ' -d ' + dbOptions.database +
                ' -U ' + dbOptions.user +
                ' > ' + newBackupPath;
    const password = dbOptions.pass + ' \r\n';

    exec(cmd, { cwd: 'C:\\Program Files\\PostgreSQL\\12\\bin\\' });

  }
}


dbAutoBackUp();


/*
exec(cmd,
      { cwd: 'C:\\Program Files\\PostgreSQL\\12\\bin\\' },
      function(error, stdout, stderr) {
      console.log('error: ' + error);
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error) {
        console.log(error.stack);
        console.log('Error code: ' + error.code);
        console.log('Signal received: ' + error.signal);
      }
      if (empty(error)) {
        if (dbOptions.removeOldBackup == true) {
          if (fs.existsSync(oldBackupPath)) {
            exec("rm -rf " + oldBackupPath, function(err) {
              console.log(err);
            });
          }
        }
      }
    });

 */