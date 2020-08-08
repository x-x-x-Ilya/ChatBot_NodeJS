'use strict';
import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';
const basename = path.basename(__filename);
const env = 'development';
const config = require('../config/config.json')[env];

// eslint-disable-next-line @typescript-eslint/no-var-requires
const clients = require('../src/database/sequelize/models/clients');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const services = require('../src/database/sequelize/models/services');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const barbers = require( '../src/database/sequelize/models/barbers');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const appointments = require( '../src/database/sequelize/models/appointments');

const db = {clients, services, barbers, appointments};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(process.env.DB_NAME,
                            process.env.USER_NAME,
                            process.env.DB_PASS,
                            config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) &&
      (file !== basename) &&
      (file.slice(-3) === '.js');
  })
  .forEach(file => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const model = require(path.join(__dirname, file))
    (sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;