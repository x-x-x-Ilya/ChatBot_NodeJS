// eslint-disable-next-line @typescript-eslint/no-var-requires
const Barber = require('../database/models/barbers');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('sequelize-values')();

export class BarberRepository {

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async showBarberList() : Promise<string>{
    return await Barber.findAll({
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



  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async selectBarber() {
    return await Barber.findOne({});
  }

}