import Sequelize from 'sequelize';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const appointments = require('./appointments');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const BarberDatabase = require('../sequelize');

const barbers = BarberDatabase.define('barbers', {
  id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
  first_name: { type: Sequelize.STRING, allowNull: false},
  last_name: { type: Sequelize.STRING, allowNull: false},
  deleted: { type: Sequelize.BOOLEAN, allowNull: false}
});

barbers.associate = (models) => {
  barbers.belongsTo(models.appointments, { foreignKey: 'id' });
};

module.exports = barbers;