import {barbers} from '../database/models/barbers';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('sequelize-values')();

export class BarberRepository {

  async showBarberList() {
    return await barbers.findAll({
      attributes: ['first_name', 'last_name'],
      raw: true
    });
  }

    async selectBarber() {
    return await barbers.findOne({});
  }

}