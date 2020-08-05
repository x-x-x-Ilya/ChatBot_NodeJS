import { logError } from '../middleware/logging';
const exec = require('child_process').exec;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CronJob = require('cron').CronJob;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

const autoBackupPath = 'C:\\project\\ChatBot_NodeJS\\back\\PostgresSQL.sql';
const dir = 'C:\\project\\ChatBot_NodeJS\\back';


const dbAutoBackUp = (): void => {
  fs.readdir(dir, (err, files) => {
    // delete old files
    while (files.length >= 4) {
      fs.unlink(dir + '\\' + files[0], function(err) {
        if (err) {
          logError(err);
          throw err;
        }
      });
    }
  });
  // create new back up file
  const date = new Date();
  const newBackupDir =
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  // New backup path for current backup process
  const newBackupPath = autoBackupPath + 'psql-' + newBackupDir + '.sql';
  const cmd = 'pg_dump --no-password -U' + process.env.USER_NAME + ' ' +
    process.env.DB_NAME + ' > ' + newBackupPath;
  exec(cmd, { cwd: 'C:\\Program Files\\PostgreSQL\\12\\bin\\' });
  //copy to mongo
  mongoInit(newBackupPath);
}

export const job = new CronJob('0 0 0 * * 0', dbAutoBackUp(), null, true);

function mongoInit(path) {
  fs.readFile(path, "utf8", function(error, data) {
      if (error) {
        logError(error);
        throw error;
      }
      // все объекты
      data = data.substring(data.indexOf('COPY'));
      data = data.substring(0, data.lastIndexOf('\\.') + 2);
      let collections;
      while (data.indexOf('COPY') != -1) {
        collections = data.substring(  // объекты одной таблицы
          data.indexOf('COPY'),
          data.indexOf('\\.') + 2);
        data = data.replace(collections, '');
        const fields_str = collections.substring(
          collections.indexOf('(') + 1,
          collections.indexOf(')'));
        const fields = fields_str.split(', ');   // поля таблицы
        // имя таблицы
        let collection_name = collections.substring(
          collections.indexOf('COPY public.') + 'COPY public.'.length,
          collections.indexOf('(') - 1)
        // значения таблицы
        let values: string = collections.substring(
          collections.indexOf('FROM stdin;') + 'FROM stdin;'.length + 2,
          collections.indexOf('\\.'));
        let contenet = '[\n';
        while (values.indexOf('\n') != -1 && values.length != 0) {
          let line_values = values.substring(0, values.indexOf('\n') + 1);
          values = values.replace(line_values, '');
          line_values = line_values.substring(0, line_values.length - 2);
          const arr_values = line_values.split('\t');
          for (let j = 0; j < arr_values.length; j++) {
            if(arr_values[j] == 'f') arr_values[j] = 'false';
            if(arr_values[j] == 't') arr_values[j] = 'true';
            if(arr_values[j] == '\\N') arr_values[j] = 'null';
          }
          for (let j = 0; j < arr_values.length; j++) {
            console.log(arr_values[j]);
          }

          contenet += '\t{\n';
          for (let j = 0; j < arr_values.length; j++) {
            if (j != fields.length - 1)
              contenet += '\t\t' + fields[j] + ': "' + arr_values[j] + '",\n';
            else
              contenet += '\t\t' + fields[j] + ': "' + arr_values[j] + '"\n\t},\n';
          }
        }
        contenet = contenet.substring(0, contenet.length - 2);
        if (contenet.indexOf('[') != -1)
          contenet += '\n]';
        else
          contenet += '[{}]'

        while (collection_name.indexOf('"') != -1)
          collection_name = collection_name.replace('"', '');

         fs.writeFile("D:\\mongotest\\" + collection_name + ".json", contenet + " ",
           function(error) {
          if (error) {
            logError(error);
            throw error;
          }

          // копирует данные из сформированного json файла
          const cmd = "mongoimport --db test --collection " + collection_name + " < D:/mongotest/" + collection_name + ".json --legacy --jsonArray";
          exec(cmd, { cwd: 'C:\\Program Files\\MongoDB\\Server\\4.2\\bin' },
            function(error) {
            if (error) {
              logError(error);
              throw error;
            }
          });

        });
      }

    });
}