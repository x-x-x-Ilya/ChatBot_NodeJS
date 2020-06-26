import Sequelize from 'sequelize';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AppointmentDatabase = require('../sequelize');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const barbers = require('./barbers');

const appointments = AppointmentDatabase.define('appointments', {
  id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},  // serial not INTEGER
  date: { type: Sequelize.DATE, allowNull: false},
  client_id:{ type: Sequelize.INTEGER, allowNull: false},
  service_id:{ type: Sequelize.INTEGER, allowNull: true},
  barber_id:{ type: Sequelize.INTEGER, allowNull: true},
  deleted: { type: Sequelize.BOOLEAN, allowNull: false}
});

module.exports = appointments;
