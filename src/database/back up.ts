const fs = require('fs');
const _ = require('lodash');
const exec = require('child_process').exec;

const dbOptions =  {
  user: process.env.USER_NAME,
  pass: process.env.DB_PASS,
  host: process.env.HOST,
  port: 3000,
  database: process.env.DB_NAME,
  autoBackup: true,
  removeOldBackup: true,
  keepLastDaysBackup: 2,
  autoBackupPath: '<serverPath>' // i.e. /var/database-backup/
};

/* return date object */
exports.stringToDate = function (dateString) {
  return new Date(dateString);
}

/* return if variable is empty or not. */
//export.empty = function(mixedVar) {
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


// Auto backup script

function dbAutoBackUp() {
// check for auto backup is enabled or disabled
  if (dbOptions.autoBackup == true) {
    const date = new Date();
    let beforeDate, oldBackupDir, oldBackupPath;
    const currentDate = this.stringToDate(date); // Current date
    const newBackupDir = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
    const newBackupPath = dbOptions.autoBackupPath + 'mongodump-' + newBackupDir; // New backup path for current backup process
    // check for remove old backup after keeping # of days given in configuration
    if (dbOptions.removeOldBackup == true) {
      beforeDate = _.clone(currentDate);
      beforeDate.setDate(beforeDate.getDate() - dbOptions.keepLastDaysBackup); // Substract number of days to keep backup and remove old backup
      oldBackupDir = beforeDate.getFullYear() + '-' + (beforeDate.getMonth() + 1) + '-' + beforeDate.getDate();
      oldBackupPath = dbOptions.autoBackupPath + 'mongodump-' + oldBackupDir; // old backup(after keeping # of days)
    }
    const cmd = 'mongodump --host ' + dbOptions.host + ' --port ' + dbOptions.port + ' --db ' + dbOptions.database + ' --username ' + dbOptions.user + ' --password ' + dbOptions.pass + ' --out ' + newBackupPath; // Command for mongodb dump process

    exec(cmd, function (error, stdout, stderr) {
      if (this.empty(error)) {
        // check for remove old backup after keeping # of days given in configuration
        if (dbOptions.removeOldBackup == true) {
          if (fs.existsSync(oldBackupPath)) {
            exec("rm -rf " + oldBackupPath, function (err) { });
          }
        }
      }
    });
  }
}


const CronJob = require('cron').CronJob;
const Cron = require('./ mongodb_backup.js');

new CronJob ('0 0 0 * * *', function () {
  Cron.dbAutoBackUp();
}, null, true, 'America / New_York');