// mongoimport --db test --collection users < D:/mongotest/test.json --legacy
import { exec } from 'child_process';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

fs.readFile(
  "C:\\project\\ChatBot_NodeJS\\back up\\test.sql",
  "utf8",
  function(error,data) {
    if (error) throw error;
    data = data.substring(data.indexOf('COPY'));
    data = data.substring(0, data.lastIndexOf('\\.') + 2);
    const collections = [];
    let i = 0;

    while (data.indexOf('COPY') != -1) {

        collections[i] = data.substring(
          data.indexOf('COPY'),
          data.indexOf('\\.') + 2);

        data = data.replace(collections[i], '');

        const fields_str = collections[i].substring(
          collections[i].indexOf('(') + 1,
          collections[i].indexOf(')'));

        const fields = fields_str.split(', ');

        const collection_name = collections[i].substring(
          collections[i].indexOf('COPY public.') + 'COPY public.'.length,
          collections[i].indexOf('(') - 1)

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