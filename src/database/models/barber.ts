// eslint-disable-next-line @typescript-eslint/no-var-requires
const sequelize = require('sequelize');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dbase = require('../sequelize');

const Barber = dbase.define('barbers', {
  id: { type: sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},  // serial not INTEGER
  email: { type: sequelize.STRING, allowNull: false},
  first_name: { type: sequelize.STRING, allowNull: false},
  last_name: { type: sequelize.STRING, allowNull: false },
  deleted: { type: sequelize.BOOLEAN, allowNull: false}
});

module.exports = Barber;