import {barbers} from '../database/models/barbers';

export class BarberRepository {

  async showBarberList() {
    return await barbers.findAll({
      attributes: ['first_name', 'last_name', 'id'],
      raw: true
    });
  }

    async selectBarber(id) {
    return await barbers.findOne({
      where:{
        id:id
      }
    });
  }

}