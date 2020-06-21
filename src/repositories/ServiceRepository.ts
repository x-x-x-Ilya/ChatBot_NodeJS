// eslint-disable-next-line @typescript-eslint/no-var-requires
const Service = require('../database/models/services');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('sequelize-values')();

export class ServiceRepository {

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async showPriceList() : Promise<string>{
    return await Service.findAll({
      where: { deleted: false },
      attributes: ['id', 'name', 'time'],
      raw: true,
    }).then(function(services) {
      let Response = '\r\n';
      for (let i = 0; i < services.length; i++) {
        Response += Sequelize.getValues(services[i].id) + ' ';
        Response += Sequelize.getValues(services[i].name) + ' ';
        Response += Sequelize.getValues(services[i].time) + '\r\n';
      }
      return Response;
    });}


    /*;
    console.log(service.map(service => service.toJSON()));
    return service.map(service => service.toJSON());
  }
*/
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async selectPrice(msg_should_be_id) {
    try {
    const service = await Service.findOne({
      where:{
        id: msg_should_be_id
      },
      attributes: ['id', 'name', 'time']});
      console.log(service);
      return service;
  } catch (e) {
      console.log(e);
    }
  }

}