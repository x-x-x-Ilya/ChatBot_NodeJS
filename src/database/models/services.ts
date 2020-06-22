// eslint-disable-next-line @typescript-eslint/no-var-requires
const ServiceSequelize = require('sequelize');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ServiceDatabase = require('../sequelize');

const services = ServiceDatabase.define('services', {
  id: { type: ServiceSequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},  // serial not INTEGER
  name: { type: ServiceSequelize.STRING, allowNull: false },
  time: { type: ServiceSequelize.TIME, allowNull: false },
  price: { type: ServiceSequelize.INTEGER, allowNull: false },
  deleted: { type: ServiceSequelize.BOOLEAN, allowNull: false}
});

module.exports = services;