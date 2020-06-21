// eslint-disable-next-line @typescript-eslint/no-var-requires
const BarberSequelize = require('sequelize');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const BarberDatabase = require('../sequelize');

const barbers = BarberDatabase.define('barbers', {
  id: { type: BarberSequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},  // but INTEGER not serial!!!
  email: { type: BarberSequelize.STRING, allowNull: false},
  first_name: { type: BarberSequelize.STRING, allowNull: false},
  deleted: { type: BarberSequelize.BOOLEAN, allowNull: false}
});

module.exports = barbers;