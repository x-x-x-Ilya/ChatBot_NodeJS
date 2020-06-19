// eslint-disable-next-line @typescript-eslint/no-var-requires
const Service = require('../database/models/services');

export class ServiceRepository {

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async showPriceList() {
    await Service.findAll({
      attributes: ['name', 'time']
    }).then((barber) => {
      console.log(barber.map(barber => barber.toJSON()));
    });
    return 'bla';
  }

}