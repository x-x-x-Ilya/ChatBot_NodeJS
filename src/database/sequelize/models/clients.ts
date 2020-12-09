import Sequelize from 'sequelize';
import ClientDatabase from '../sequelize';

export const clients = ClientDatabase.define('clients', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: { type: Sequelize.STRING, allowNull: false },
  last_name: { type: Sequelize.STRING, allowNull: true },
  email: { type: Sequelize.STRING, allowNull: true },
  deleted: { type: Sequelize.BOOLEAN, allowNull: false },
});
