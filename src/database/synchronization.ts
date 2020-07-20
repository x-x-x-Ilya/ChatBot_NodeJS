// eslint-disable-next-line @typescript-eslint/no-var-requires
const database = require('./sequelize');
import { log_error } from '../middleware/logging';

// database connect function
export async function connect() : Promise<void> {
  try {
    await database.authenticate();
    console.log('Database connection has been established successfully.');
    await database.sync();
    console.log('Database synchronization has been established successfully.');
  } catch (error) {
    log_error(error);
  }
}
