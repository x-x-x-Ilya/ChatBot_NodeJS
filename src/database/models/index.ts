// eslint-disable-next-line @typescript-eslint/no-var-requires
const barbers = require('./barbers');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const appointments = require('./appointments');
import {clients} from './clients';
import {services} from './services';

barbers.hasMany(appointments, {foreignKey: 'id'});
appointments.belongsTo(barbers, {foreignKey: 'barber_id'});

export const db = { barbers, appointments, clients, services };
exports.init = () => {
  Object.keys(db).forEach((modelName) => {
    db[modelName].associate && db[modelName].associate(db);
  });
};