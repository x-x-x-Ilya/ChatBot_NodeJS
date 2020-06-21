// eslint-disable-next-line @typescript-eslint/no-var-requires
const Barber = require('../database/models/barbers');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('sequelize-values')();

export class BarberRepository {

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async showBarberList() : Promise<string>{
    return await Barber.findAll({
      attributes: ['email', 'first_name', 'id'],
      raw: true,
    }).then(function(tasks) {
      let Response = '\r\n';
      for (let i = 0; i < tasks.length; i++) {
        Response += Sequelize.getValues(tasks[i].id) + ' ';
        Response += Sequelize.getValues(tasks[i].first_name) + ' ';
        Response += Sequelize.getValues(tasks[i].email) + '\r\n';
      }
      return Response;
    });}



  async selectBarber() {
    await Barber.findOne({});
  }

}