import { log } from '../middleware/logging';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const child_process = require('child_process');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CronJob = require('cron').CronJob;
import { CronCommand } from 'cron';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongodb = require('mongodb');

const url = 'mongodb://localhost:27017/';
const autoBackupPath = 'C:\\project\\ChatBot_NodeJS\\back\\PostgresSQL.sql';
const dir = 'C:\\project\\ChatBot_NodeJS\\back';

function deleteOldFiles() {
    fs.readdir(dir, (err, files) => {
        // delete old files
        while (files.length >= 4) {
            fs.unlink(dir + '\\' + files[0], function(err) {
                if (err) {
                    log('./logs/_errors.txt', err, ' ');
                    throw err;
                }
            });
        }
    });
}

// to use promise with exec
function execShellCommand(cmd) {
    return new Promise(resolve => {
        child_process.exec(
            cmd,
            { cwd: 'C:\\Program Files\\PostgreSQL\\12\\bin\\' },
            (error, stdout, stderr) => {
                if (error) log('./logs/_errors.txt', error, ' ');
                resolve(stdout ? stdout : stderr);
            },
        );
    });
}

function mongoInit(path) {
    mongodb.MongoClient.connect(url, function(err, db) {
        const dbo = db.db('test');
        dbo.collection('back_up').drop(function(err) {
            if (err) {
                log('./logs/_errors.txt', err, ' ');
                throw err;
            }
        });
        dbo.collection('back_up').insertOne(path, function(err) {
            db.close();
            if (err) console.log(err);
        });
    });
}

const dbAutoBackUp = (): CronCommand => {
    /* deleteOldFiles();
   // create new back up file
   const date = new Date();
   const newBackup =
     date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
   const newBackupPath = autoBackupPath + 'psql-' + newBackup + '.sql';
 
   const cmd = 'pg_dump --no-password -U' + process.env.USER_NAME + ' ' +
     process.env.DB_NAME + ' > ' + newBackupPath;
 
   execShellCommand(cmd).then(() => {
     mongoInit(newBackupPath);
   });*/
    return null;
};

export const job = new CronJob('0 0 0 * * 0', dbAutoBackUp(), null, true);
