// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('sequelize-values')();
import {services} from '../database/models/services';

export class ServiceRepository {

  async showPriceList() {
    return await services.findAll({
      where: { deleted: false },
      attributes: ['name', 'time', 'price'],
      raw: true,
    });
  }

  async selectPrice(msg_should_be_id) {
    const service = await services.findOne({
      where:{
        id: msg_should_be_id
      },
      attributes: ['price', 'name', 'time']});
      console.log(service);
      return service;
  }

}