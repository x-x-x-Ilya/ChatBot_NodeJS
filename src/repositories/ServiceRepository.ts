import { services } from '../database/sequelize/models/services';
import { barbers } from '../database/sequelize/models/barbers';

export class ServiceRepository {
    async amenitiesList(): Promise<Array<any>> {
        return services.findAll({
            where: { deleted: false },
            attributes: ['name', 'duration', 'price', 'id'],
            raw: true,
        });
    }

    async barberList(): Promise<Array<any>> {
        return barbers.findAll({
            attributes: ['first_name', 'last_name', 'id'],
            raw: true,
        });
    }
}
