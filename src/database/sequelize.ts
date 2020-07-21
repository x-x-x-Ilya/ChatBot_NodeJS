import { Sequelize } from 'sequelize';
import { LogError } from '../middleware/logging';
try {
  module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.USER_NAME,
    process.env.DB_PASS,
    {
      dialect: 'postgres',
      host: process.env.HOST,
      dialectOptions: {
        connectTimeout: 1000,
      },
      pool: {
        min: 0,
        max: 5,
        idle: 10000,
        acquire: 30000,
      },
      logging: false,
      define: {
        timestamps: false,
      },
    },
  );
  console.log('Sequelize connected');
} catch (error) {
  LogError(error);
}
