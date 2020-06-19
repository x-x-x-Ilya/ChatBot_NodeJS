// eslint-disable-next-line @typescript-eslint/no-var-requires
const ServiceSequelize = require('sequelize');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ServiceDatabase = require('../sequelize');

export const services = ServiceDatabase.define('services', {
  id: { type: ServiceSequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},  // serial not INTEGER
  name: { type: ServiceSequelize.STRING, allowNull: false },
  time: { type: ServiceSequelize.TIME, allowNull: false },
  deleted: { type: BarberSequelize.BOOLEAN, allowNull: false}
});