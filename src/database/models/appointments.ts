import Sequelize from 'sequelize';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AppointmentDatabase = require('../sequelize');

export const appointments = AppointmentDatabase.define('appointments', {
  id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},  // serial not INTEGER
  date: { type: Sequelize.DATE, allowNull: false},
  client_id:{ type: Sequelize.INTEGER, allowNull: false},
  service_id:{ type: Sequelize.INTEGER, allowNull: false},
  barber_id:{ type: Sequelize.INTEGER, allowNull: false},
  deleted: { type: Sequelize.BOOLEAN, allowNull: false}
});
