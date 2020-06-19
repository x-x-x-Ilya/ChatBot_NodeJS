// eslint-disable-next-line @typescript-eslint/no-var-requires
const ClientSequelize = require('sequelize');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ClientDatabase = require('../sequelize');

export const clients = ClientDatabase.define('clients', {
  id: { type: ClientSequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},  // serial not INTEGER
  first_name: { type: ClientSequelize.STRING, allowNull: false },
  last_name: { type: ClientSequelize.STRING, allowNull: false },
  email: { type: ClientSequelize.STRING, allowNull: false },
  deleted: { type: BarberSequelize.BOOLEAN, allowNull: false}
});