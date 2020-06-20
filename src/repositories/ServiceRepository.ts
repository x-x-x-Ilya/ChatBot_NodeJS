// eslint-disable-next-line @typescript-eslint/no-var-requires
const Service = require('../database/models/services');

export class ServiceRepository {

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async showPriceList() {
    await Service.findAll({
      where:{deleted:false},
      attributes: ['id', 'name', 'time']
    }).then((service) => {
      console.log(service.map(service => service.toJSON()));
      return service.map(service => service.toJSON());
    });
  }

  selectPrice(msg_should_be_id) {
    const r = Service.findOne({where:{id:msg_should_be_id}});
    return r;
  }

}