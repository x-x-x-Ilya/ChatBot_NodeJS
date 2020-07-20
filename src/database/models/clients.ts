import Sequelize from 'sequelize';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ClientDatabase = require('../sequelize');


//export const clients = ClientDatabase.define('clients', {
export const clients = ClientDatabase.define('clients', {
id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  }, // serial not INTEGER
  first_name: { type: Sequelize.STRING, allowNull: false },
  last_name: { type: Sequelize.STRING, allowNull: true },
  email: { type: Sequelize.STRING, allowNull: true },
  deleted: { type: Sequelize.BOOLEAN, allowNull: false },
});
