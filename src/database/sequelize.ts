import {Sequelize} from 'sequelize';

try {
  module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.USER_NAME,
    process.env.DB_PASS,
  {
      dialect: 'postgres',
      host: process.env.HOST,
      dialectOptions: {
        connectTimeout: 1000
      },
      pool: {
        min: 0,
        max: 5,
        idle: 10000,
        acquire: 30000,
      },
      logging: false,
      define: {
        timestamps: false,
      }
    });
  console.log("Sequelize connected")
} catch (error) {
  console.log(error);
}







/*

import { exec } from 'child_process';
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
  autoBackupPath: 'D:\\test\\new.sql' // i.e. /var/database-backup/
};
*/
/* return date object */
/*function stringToDate(dateString) {
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
    const newBackupDir = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
    const newBackupPath = dbOptions.autoBackupPath + 'psql-' + newBackupDir + '.sql'; // New backup path for current backup process
    // check for remove old backup after keeping # of days given in configuration
    if (dbOptions.removeOldBackup == true) {
      beforeDate = _.clone(currentDate);
      beforeDate.setDate(beforeDate.getDate() - dbOptions.keepLastDaysBackup); // Substract number of days to keep backup and remove old backup
      oldBackupDir = beforeDate.getFullYear() + '-' + (beforeDate.getMonth() + 1) + '-' + beforeDate.getDate();
      oldBackupPath = dbOptions.autoBackupPath + 'psql-' + oldBackupDir; // old backup(after keeping # of days)
    }
    const cmd = 'pg_dump  -h ' + dbOptions.host + ' -p ' + dbOptions.port + ' -d ' + dbOptions.database + ' -U ' + dbOptions.user + ' > ' + newBackupPath; // Command for mongodb dump process
    const password = dbOptions.pass + ' \r\n';
    //  pg_dump -h localhost -p 5432 -d barbershop -U postgres > D:\test\test.sql
    // C:\Program Files\PostgreSQL\12\bin\


    // после этого запрашивается пароль, как его ввести...
    exec(cmd, { cwd: 'C:\\Program Files\\PostgreSQL\\12\\bin\\' }, function(error, stdout, stderr) {
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
  }
}

dbAutoBackUp();*/