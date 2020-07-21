import { services } from '../database/models/services';

export class ServiceRepository {
  async showPriceList(): Promise<Array<any>> {
    return services.findAll({
      where: { deleted: false },
      attributes: ['name', 'time', 'price', 'id'],
      raw: true,
    });
  }
}
