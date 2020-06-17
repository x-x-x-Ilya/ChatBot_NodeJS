// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Client } = require('pg');

export const client = new Client({ // подключение к серверной бд
  user: 'postgres',
  host: 'localhost',
  database: 'barbershop',
  password: 'root',
  port: 5432,
});

try {
  client.connect();
  module.exports = client;
} catch (e) {
  console.log("ERROR: " + e);
}