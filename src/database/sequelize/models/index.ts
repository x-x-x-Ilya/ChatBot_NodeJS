import { clients } from './clients';
import { services } from './services';
import { barbers } from './barbers';
import { appointments } from './appointments';

barbers.hasMany(appointments, { foreignKey: 'id' });
appointments.belongsTo(barbers, { foreignKey: 'barber_id' });

services.hasMany(appointments, { foreignKey: 'id' });
appointments.belongsTo(services, { foreignKey: 'service_id' });

const db = { barbers, appointments, clients, services };

export class Init {
    constructor() {
        Object.keys(db).forEach(modelName => {
            db[modelName].associate && db[modelName].associate(db);
        });
    }
}
