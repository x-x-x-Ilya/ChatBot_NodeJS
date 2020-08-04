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

//export const job = new CronJob('0 0 0 * * 0', dbAutoBackUp(), null, true);


/**
 * COPY public."SequelizeMeta" (name) FROM stdin;
 * \.
 */
function mongoInit(path) {
// mongoimport --db test --collection users < D:/mongotest/test.json --legacy
  fs.readFile(
            path,
    "utf8",
    function(error, data) {
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
      let collection_name = collections[i].substring(
        collections[i].indexOf('COPY public.') + 'COPY public.'.length,
        collections[i].indexOf('(') - 1)
      // значения таблицы
      let values: string = collections[i].substring(
        collections[i].indexOf('FROM stdin;') + 'FROM stdin;'.length + 2,
        collections[i].indexOf('\\.'));
      let contenet = '[\n';
      while (values.indexOf('\n') != -1 && values.length != 0) {
        let line_values = values.substring(0, values.indexOf('\n') + 1);
        values = values.replace(line_values, '');
        line_values =  line_values.substring(0, line_values.length - 2);
        const arr_values = line_values.split('\t');
        contenet += '\t{\n';
        for (let j = 0; j < arr_values.length; j++) {
          if (j != fields.length - 1)
            contenet += '\t\t' + fields[j] + ': "' + arr_values[j] + '",\n';
          else
            contenet += '\t\t' + fields[j] + ': "' + arr_values[j] + '"\n\t},\n';
        }
      }
      contenet = contenet.substring(0, contenet.length - 2);
      if(contenet.indexOf('[') != -1)
      contenet += '\n]';
      while(collection_name.indexOf('"') != -1)
        collection_name = collection_name.replace('"', '');

      fs.writeFile("D:\\mongotest\\" + collection_name + ".json", contenet + " ", function(error){
        if(error){
          logError(error);
          throw error;
        }
      });
    }

  });
}

mongoInit('C:\\project\\ChatBot_NodeJS\\back\\PostgresSQL.sqlpsql-2020-8-3.sql');

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