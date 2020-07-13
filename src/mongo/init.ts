const MongoClient = require("mongodb").MongoClient;

// создаем объект MongoClient и передаем ему строку подключения
const mongoClient = new MongoClient("mongodb://localhost:27017/",
  { useNewUrlParser: true });

mongoClient.connect(function(err, client) {
  if (err) {
    return console.log(err);
  }
  // взаимодействие с базой данных
  const db = client.db("test");

  // mongoimport --db test --collection users < D:/mongotest/test.json --legacy

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

  client.close();
});