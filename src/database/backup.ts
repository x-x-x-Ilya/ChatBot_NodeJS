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
  //copy to mongo
  mongoInit(newBackupPath);
}

export const job = new CronJob('0 0 0 * * 0', dbAutoBackUp(), null, true);

function mongoInit(path) {
// mongoimport --db test --collection users < D:/mongotest/test.json --legacy
  fs.readFile(path, function(error, data) {
      if (error) {
        logError(error);
        throw error;
      }
      // все объекты
      data = data.substring(data.indexOf('COPY'));
      data = data.substring(0, data.lastIndexOf('\\.') + 2);
      const collections = [];
      let i = 0;

      while (data.indexOf('COPY') != -1) {

        collections[i] = data.substring(  // объекты одной таблицы
          data.indexOf('COPY'),
          data.indexOf('\\.') + 2);

        data = data.replace(collections[i], '');

        const fields_str = collections[i].substring(
          collections[i].indexOf('(') + 1,
          collections[i].indexOf(')'));
        const fields = fields_str.split(', ');   // поля таблицы

        // имя таблицы
        const collection_name = collections[i].substring(
          collections[i].indexOf('COPY public.') + 'COPY public.'.length,
          collections[i].indexOf('(') - 1)

        // значения таблицы
        let date: string = collections[i].substring(
          collections[i].indexOf('FROM stdin;') + 'FROM stdin;'.length,
          collections[i].indexOf('\\.'));

        let contenet = '[';
        while (date.indexOf('\n') != -1 && date.length != 0) {
          let curr_fields_str = date.substring(0, date.indexOf('\n') + 1);
          //console.log("curr_fields_str = " + curr_fields_str);
          date = date.replace(curr_fields_str, '');
          //curr_fields_str = date.substring(0, date.indexOf('\n') + 1);
          //console.log(curr_fields_str);
          const curr_fields = curr_fields_str.split('\t');

          //for(let  i = 0; i < curr_fields.length; i++)
          //  console.log("curr_fields = " + curr_fields[i]);

          /*for (let j = 0; j < curr_fields.length; j++) {
              if (j == 0) console.log(collection_name);
              console.log(fields[j] + " = " + curr_fields[j] + "|");
          }*/


          contenet += '{';
          for (let j = 0; j < curr_fields.length; j++) {
            if (j != fields.length - 1)
              contenet += fields[j] + ': ' + '"' +
                curr_fields[j] + '"' + ',';
            else
              contenet += fields[j] + ': ' + '"' +
                curr_fields[j] + '"' + '}';
          }
          /*for (let i = 0; i < curr_fields.length; i++) {
              if (i != fields.length - 1)
                  contenet += fields[i] + ': ' + '"' + curr_fields[i] + '"' + ',';
              else
                  contenet += fields[i] + ': ' + '"' + curr_fields[i] + '"' + '}';
          }*/

          contenet += ']';
          //console.log(collection_name);
          //console.log(contenet);

          /*fs.writeFile(collection_name + '.json', contenet,function(error){
              if(error) throw error; // если возникла ошибка
          });*/
          i++;
        }
      }

    });
}
//collections[i].indexOf('COPY public.');
//collections[i].indexOf('(');


// копирует данные из сформированного json файла
//const cmd = "mongoimport --db test --collection users < D:/mongotest/test.json --legacy";
//exec(cmd,  { cwd: 'C:\\Program Files\\MongoDB\\Server\\4.2\\bin' });
/*
const MongoClient = require("mongodb").MongoClient;

const mongoClient = new MongoClient("mongodb://localhost:27017/",
  { useNewUrlParser: true });

mongoClient.connect(function(err, client) {
  if (err) {
    return console.log(err);
  }

  const db = client.db("test");

  // пример
  const collection = db.collection("users");

  const user = { name: "Tom", age: 23 };

  collection.insertOne(user, function(err, result) {
    if (err) {
      return console.log(err);
    }
    console.log(result.ops);
    client.close();
  });
   */
// client.close();
//});