// eslint-disable-next-line @typescript-eslint/no-var-requires
const AppointmentSequelize = require('sequelize');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AppointmentDatabase = require('../sequelize');

const appointments = AppointmentDatabase.define('appointments', {
  id: { type: AppointmentSequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},  // serial not INTEGER
  date: { type: AppointmentSequelize.DATE, allowNull: false},
  client_id:{ type: AppointmentSequelize.INTEGER, allowNull: false},
  service_id:{ type: AppointmentSequelize.INTEGER, allowNull: false},
  barber_id:{ type: AppointmentSequelize.INTEGER, allowNull: false},
  deleted: { type: AppointmentSequelize.BOOLEAN, allowNull: false}
});

appointments.associate = (models) => {
  appointments.belongsTo(models.barbers, { foreignKey: 'barber_id' });
  appointments.belongsTo(models.clients, { foreignKey: 'client_id' });
  appointments.belongsTo(models.services, { foreignKey: 'service_id' });
};

module.exports = appointments;
