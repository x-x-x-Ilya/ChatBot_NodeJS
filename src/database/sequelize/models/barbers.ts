import Sequelize from 'sequelize';
import BarberDatabase from '../sequelize';

export const barbers = BarberDatabase.define('barbers', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: { type: Sequelize.STRING, allowNull: false },
  last_name: { type: Sequelize.STRING, allowNull: false },
  deleted: { type: Sequelize.BOOLEAN, allowNull: false },
});
