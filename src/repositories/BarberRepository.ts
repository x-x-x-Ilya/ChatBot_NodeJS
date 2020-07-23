import { barbers } from '../database/models/barbers';

export class BarberRepository {
  async list(): Promise<Array<any>> {
    return  barbers.findAll({
      attributes: ['first_name', 'last_name', 'id'],
      raw: true,
    });
  }
}
