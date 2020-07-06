import { barbers } from '../database/models/barbers';

export class BarberRepository {
  async showBarberList(): Promise<Array<any>> {
    return await barbers.findAll({
      attributes: ['first_name', 'last_name', 'id'],
      raw: true,
    });
  }

  async selectBarber(id: number): Promise<any> {
    return await barbers.findOne({
      where: { id: id },
    });
  }
}
