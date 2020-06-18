// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('sequelize');
import {database} from './connect';

export const Barber = database.define('barbers', {
  id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},  // serial not INTEGER
  name: { type: Sequelize.STRING, allowNull: false, field: 'user_id' }
});