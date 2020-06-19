// eslint-disable-next-line @typescript-eslint/no-var-requires
const barber = require('./barbers');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const appointment = require('./appointments');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const client = require('./clients');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const service = require('./services');

const db = { barber, appointment, client, service };
exports.init = () => {
  Object.keys(db).forEach((modelName) => {
    db[modelName].associate && db[modelName].associate(db);
  });
};