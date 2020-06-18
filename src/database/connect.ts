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