import Sequelize from 'sequelize';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ServiceDatabase = require('../sequelize');

export const services = ServiceDatabase.define('services', {
  id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},  // serial not INTEGER
  name: { type: Sequelize.STRING, allowNull: false },
  time: { type: Sequelize.TIME, allowNull: false },
  price: { type: Sequelize.INTEGER, allowNull: false },
  deleted: { type: Sequelize.BOOLEAN, allowNull: false}
});


