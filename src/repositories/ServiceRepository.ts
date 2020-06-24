import {services} from '../database/models/services';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('sequelize-values')();

export class ServiceRepository {

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async showPriceList() : Promise<string>{
    return await services.findAll({
      where: { deleted: false },
      attributes: ['name', 'time', 'price'],
      raw: true,
    }).then(function(services) {
      let Response = '\r\n';
      for (let i = 0; i < services.length; i++) {
        Response += Sequelize.getValues(services[i].name) + ' ';
        Response += Sequelize.getValues(services[i].time) + ' ';
        Response += Sequelize.getValues(services[i].price) + '\r\n';
      }
      return Response;
    });}


  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async selectPrice(msg_should_be_id) {
    try {
    const service = await services.findOne({
      where:{
        id: msg_should_be_id
      },
      attributes: ['price', 'name', 'time']});
      console.log(service);
      return service;
  } catch (e) {
      console.log(e);
    }
  }

}