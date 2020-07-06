module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user', {
      "id": {
        "type": Sequelize.INTEGER,
        "field": "id",
        "autoIncrement": true,
        "primaryKey": true,
        "allowNull": false
      },
      "email": {
        "type": Sequelize.STRING,
        "field": "email",
        "unique": true,
        "allowNull": false
      },
      "encryptedPassword": {
        "type": Sequelize.STRING,
        "field": "encryptedPassword",
        "allowNull": false
      },
      "role": {
        "type": Sequelize.ENUM('admin', 'restricted'),
        "field": "role",
        "allowNull": false
      },
      "createdAt": {
        "type": Sequelize.DATE,
        "field": "createdAt",
        "allowNull": false
      },
      "updatedAt": {
        "type": Sequelize.DATE,
        "field": "updatedAt",
        "allowNull": false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('superuser');
  }
};