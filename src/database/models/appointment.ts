// eslint-disable-next-line @typescript-eslint/no-var-requires
/*
const Sequelize = require('sequelize');
import {database} from '../connect';

const Appointment = database.define('appointments', {
  id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},  // serial not INTEGER
  date: { type: Sequelize.DATE, allowNull: false},
  time: { type: Sequelize.TIME, allowNull: false},
  deleted: { type: Sequelize.BOOLEAN, allowNull: false}
});

Appointment.associate = (models) => {
  Appointment.belongsTo(models.Barber, { foreignKey: 'id' });
  Appointment.belongsTo(models.Client, { foreignKey: 'id' });
};
module.exports = Appointment;

 */