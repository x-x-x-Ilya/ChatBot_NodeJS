// eslint-disable-next-line @typescript-eslint/no-var-requires
const AppointmentSequelize = require('sequelize');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AppointmentDatabase = require('../sequelize');

const appointments = AppointmentDatabase.define('appointments', {
  id: { type: AppointmentSequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},  // serial not INTEGER
  date: { type: AppointmentSequelize.DATE, allowNull: false},
  _begin: { type: AppointmentSequelize.TIME, allowNull: false},
  client_id:{ type: AppointmentSequelize.INTEGER, allowNull: false},
  _end: { type: AppointmentSequelize.TIME, allowNull: false},
  deleted: { type: AppointmentSequelize.BOOLEAN, allowNull: false}
});

appointments.associate = (models) => {
  appointments.belongsTo(models.barbers, { foreignKey: 'id' });
  appointments.belongsTo(models.clients, { foreignKey: 'id' });
};

module.exports = appointments;
