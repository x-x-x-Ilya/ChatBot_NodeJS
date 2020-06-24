// eslint-disable-next-line @typescript-eslint/no-var-requires
const database = require('./sequelize');

export async function connect() {
  try {
    await database.authenticate();
    console.log('Database connection has been established successfully.');
    await database.sync();
    console.log('Database synchronization has been established successfully.');
  } catch (error) {
    console.log('Unable to connect or sync with the database: ', error);
  }
};
