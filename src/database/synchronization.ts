// eslint-disable-next-line @typescript-eslint/no-var-requires
const database = require('./sequelize');

exports.authentication = async () => {
  try {
    await database.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.log('Unable to connect to the database:', error);
  }
};

exports.ModelsSynchronization = async () => {
  try {
    await database.sync();
    console.log('Database synchronization has been established successfully.');
  } catch (error) {
    console.log('Unable to sync with the database:', error);
  }
};