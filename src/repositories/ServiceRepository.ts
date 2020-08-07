import { services } from '../database/models/services';
import { barbers } from '../database/models/barbers';

export class ServiceRepository {

  async amenitiesList(): Promise<Array<any>> {
    return services.findAll({
      where: { deleted: false },
      attributes: ['name', 'time', 'price', 'id'],
      raw: true,
    });
  }

  async barberList(): Promise<Array<any>> {
    return  barbers.findAll({
      attributes: ['first_name', 'last_name', 'id'],
      raw: true,
    });
  }

}
