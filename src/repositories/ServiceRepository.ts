// eslint-disable-next-line @typescript-eslint/no-var-requires
const Service = require('../database/models/services');

export class ServiceRepository {

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async showPriceList() {
    const service = await Service.findAll({
      where:{deleted:false},
      attributes: ['id', 'name', 'time']
    });
    console.log(service.map(service => service.toJSON()));
    return service.map(service => service.toJSON());
  }

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