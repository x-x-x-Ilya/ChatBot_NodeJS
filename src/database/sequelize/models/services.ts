import Sequelize from 'sequelize';
import ServiceDatabase from '../sequelize';

export const services = ServiceDatabase.define('services', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: { type: Sequelize.STRING, allowNull: false },
    duration: { type: Sequelize.TIME, allowNull: false },
    price: { type: Sequelize.INTEGER, allowNull: false },
    deleted: { type: Sequelize.BOOLEAN, allowNull: false },
});
