import { logError } from '../middleware/logging';
const exec = require('child_process').exec;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CronJob = require('cron').CronJob;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

const dbOptions =  {
  keepLastDaysBackup: 2,
  autoBackupPath: 'C:\\project\\ChatBot_NodeJS\\back\\PostgresSQL.sql',
  dir: 'C:\\project\\ChatBot_NodeJS\\back'
};

const dbAutoBackUp = (): void => {
  fs.readdir(dbOptions.dir, (err, files) => {
    console.log("files.length = " + files.length);
    if (files.length >= 4) {
      fs.unlink(dbOptions.dir + '\\' + files[0], function(err) {
        if (err) {
          logError(err);
          throw err;
        }
      });
    }
  });
  const date = new Date();
  const newBackupDir = date.getFullYear() + '-' +
    (date.getMonth() + 1) + '-' + date.getDate();
  // New backup path for current backup process
  const newBackupPath = dbOptions.autoBackupPath +
    'psql-' + newBackupDir + '.sql';
  const cmd = 'pg_dump --no-password -U' + process.env.USER_NAME + ' ' +
    process.env.DB_NAME + ' > ' + newBackupPath;
  exec(cmd, { cwd: 'C:\\Program Files\\PostgreSQL\\12\\bin\\' });
}

export const job = new CronJob('0 0 0 * * 0', dbAutoBackUp(), null, true);