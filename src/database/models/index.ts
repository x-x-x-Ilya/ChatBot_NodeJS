// eslint-disable-next-line @typescript-eslint/no-var-requires
const barber = require('./barber');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Appointment = require('./appointment');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Client = require('./client');

const db = {
  barber//, Appointment, Client
};

exports.init = () => {
  Object.keys(db).forEach((modelName) => {
    db[modelName].associate && db[modelName].associate(db);
  });
};