import { log } from '../middleware/logging';
const exec = require('child_process').exec;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CronJob = require('cron').CronJob;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const autoBackupPath = 'C:\\project\\ChatBot_NodeJS\\back\\PostgresSQL.sql';
const dir = 'C:\\project\\ChatBot_NodeJS\\back';

const dbAutoBackUp = (): void => {

  deleteOldFiles();
  // create new back up file
  const date = new Date();
  const newBackup =
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  const newBackupPath = autoBackupPath + 'psql-' + newBackup + '.sql';

  const cmd = 'pg_dump --no-password -U' + process.env.USER_NAME + ' ' +
    process.env.DB_NAME + ' > ' + newBackupPath;

  execShellCommand(cmd).then(() => {
    // copy to mongo
    mongoInit(newBackupPath);
  });

}

function mongoInit(path) {
  fs.readFile(path, "utf8",
    function(error, data) {
      if (error) {
        log('./logs/_errors.txt', error, ' ');
        throw error;
      }

      // all objects
      data = data.substring(data.indexOf('COPY'));
      data = data.substring(0, data.lastIndexOf('\\.') + 2);

      let collections;
      while (data.indexOf('COPY') != -1) {

        collections = data.substring(  // All table objects
          data.indexOf('COPY'),
          data.indexOf('\\.') + 2);

        data = data.replace(collections, '');

        const fields_str = collections.substring(
          collections.indexOf('(') + 1,
          collections.indexOf(')'));

        const fields = fields_str.split(', ');   // Table fields

        // table name
        let collection_name = collections.substring(
          collections.indexOf('COPY public.') + 'COPY public.'.length,
          collections.indexOf('(') - 1)

        // table values
        let values: string = collections.substring(
          collections.indexOf('FROM stdin;') + 'FROM stdin;'.length + 2,
          collections.indexOf('\\.'));

        let contenet = '[\n';
        while (values.indexOf('\n') != -1 && values.length != 0) {

          let line_values = values.substring(0, values.indexOf('\n') + 1);
          values = values.replace(line_values, '');
          line_values = line_values.substring(0, line_values.length - 2);

          const arr_values = line_values.split('\t');

          contenet += '\t{\n';
          let _;
          for (let j = 0; j < arr_values.length; j++) {
            _ = '"';

            if (isNum(arr_values[j]))
              _ = '';

            if (arr_values[j] == 'f') {
              arr_values[j] = 'false';
              _ = '';
            }

            if (arr_values[j] == 't') {
              arr_values[j] = 'true';
              _ = '';
            }

            if (arr_values[j] == '\\N') {
              arr_values[j] = 'null';
              _ = '';
            }

            if (j != fields.length - 1)
              contenet += '\t\t' + fields[j] + ': ' + _ + arr_values[j] + _ + ',\n';
            else
              contenet += '\t\t' + fields[j] + ': ' + _ + arr_values[j] + _ + '\n\t},\n';
          }
        }

        contenet = contenet.substring(0, contenet.length - 2);
        if (contenet.indexOf('[') != -1)
          contenet += '\n]';
        else {
          contenet += '[{ date: "2020-05-06T09:00:00.000+00:00" }]'
        }
        while (collection_name.indexOf('"') != -1)
          collection_name = collection_name.replace('"', '');

        fs.writeFile("D:\\mongotest\\" + collection_name + ".json", contenet,
          function(error) {
            if (error) {
              log('./logs/_errors.txt', error, ' ');
              throw error;
            }
            // delete all data
            MongoClient.connect(url, function(err, db) {
              const dbo = db.db("test");
              dbo.collection(collection_name).drop(function(err, delOK) {
                if (err){
                  log('./logs/_errors.txt', err, ' ');
                  throw err;
                }
                if (delOK)
                db.close();
              });
            });
            // Copy data from json file
            const cmd = "mongoimport --db test --collection " +
              collection_name + " < D:/mongotest/" + collection_name + ".json" +
              " --legacy --jsonArray";
            exec(cmd, { cwd: 'C:\\Program Files\\MongoDB\\Server\\4.2\\bin' },
              function(error) {
                if (error) {
                  log('./logs/_errors.txt', error, ' ');
                  throw error;
                }
              });

          });
      }
    });
}

function isNum(num) {
  return !isNaN(num)
}

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
  const exec = require('child_process').exec;
  return new Promise((resolve) => {
    exec(cmd,
      { cwd: 'C:\\Program Files\\PostgreSQL\\12\\bin\\' },
      (error, stdout, stderr) => {
      if (error)
        log('./logs/_errors.txt', error, ' ');
      resolve(stdout? stdout : stderr);
    });
  });
}

export const job = new CronJob('0 0 0 * * 0', dbAutoBackUp(), null, true);
