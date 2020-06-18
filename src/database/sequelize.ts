// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('sequelize');

try {
  module.exports = new Sequelize(
    process.env.USER_NAME,
    process.env.HOST,
    process.env.DB_NAME,
    process.env.DB_PASS,
    process.env.PORT {
      dialect: 'postgres',
      host: process.env.HOST,
      dialectOptions: {
        connectTimeout: 1000
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
      }
    });
} catch (error) {
  console.log(error);
}