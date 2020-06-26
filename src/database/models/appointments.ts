import Sequelize from 'sequelize';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AppointmentDatabase = require('../sequelize');

const appointments = AppointmentDatabase.define('appointments', {
  id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},  // serial not INTEGER
  date: { type: Sequelize.DATE, allowNull: false},
  client_id:{ type: Sequelize.INTEGER, allowNull: false},
  service_id:{ type: Sequelize.INTEGER, allowNull: true},
  barber_id:{ type: Sequelize.INTEGER, allowNull: true},
  deleted: { type: Sequelize.BOOLEAN, allowNull: false}
});

appointments.associate = (models) => {
  appointments.hasOne(models.barbers, {foreignKey: 'id',sourceKey: 'barber_id'});
  //appointments.belongsTo(models.barbers, { foreignKey: 'barber_id' });
  appointments.belongsTo(models.clients, { foreignKey: 'client_id' });
  appointments.belongsTo(models.services, { foreignKey: 'service_id' });
};

module.exports = appointments;

/*
Post.associate = (models) => {
  Post.belongsToMany(models.Tag, { foreignKey: 'postId', as: 'tags', through: 'posts_tags' });
  Post.hasMany(models.Like, { foreignKey: 'postId', as: 'like' });
  Post.belongsTo(models.User, { foreignKey: 'userId' });
};*/