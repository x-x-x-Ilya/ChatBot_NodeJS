// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('sequelize');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const database = require('../connect');

export const Client = database.define('clients', {
  id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},  // serial not INTEGER
  first_name: { type: Sequelize.STRING, allowNull: false },
  last_name: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false },
});