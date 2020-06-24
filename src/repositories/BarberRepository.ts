import {barbers} from '../database/models/barbers';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('sequelize-values')();

export class BarberRepository {

  async showBarberList() : Promise<string>{
    return await barbers.findAll({
      attributes: ['first_name', 'last_name'],
      raw: true,
    }).then(function(barbers) {
      let Response = '\r\n';
      for (let i = 0; i < barbers.length; i++) {
        Response += Sequelize.getValues(barbers[i].first_name) + ' ';
        Response += Sequelize.getValues(barbers[i].last_name) + '\r\n';
      }
      return Response;
    });}

    async selectBarber() {
    return await barbers.findOne({});
  }

}