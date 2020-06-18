// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Client } = require('pg');


export const client = new Client({
  user: process.env.USER_NAME,
  host: process.env.HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.PORT
});

try {
  client.connect();
  module.exports = client;
} catch (e) {
  console.log("ERROR: " + e);
}

/*
app.post('/users', function (req, res, next) {
  const user = req.body
  pg.connect(conString, function (err, client, done) {
    if (err) {
      // Передача ошибки в обработчик express
      return next(err)
    }
    client.query('INSERT INTO users (name, age) VALUES ($1, $2);', [user.name, user.age], function (err, result) {
      done() // Этот коллбек сигнализирует драйверу pg, что соединение может быть закрыто или возвращено в пул соединений
      if (err) {
        // Передача ошибки в обработчик express
        return next(err)
      }
      res.send(200)
    })
  })
})
*/
