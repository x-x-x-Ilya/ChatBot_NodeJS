import {barbers} from './barbers';
import{appointments} from './appointments';
import {clients} from './clients';
import {services} from './services';

const db = { barbers, appointments, clients, services };
exports.init = () => {
  Object.keys(db).forEach((modelName) => {
    db[modelName].associate && db[modelName].associate(db);
  });
};