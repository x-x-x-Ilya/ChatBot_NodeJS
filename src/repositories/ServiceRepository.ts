// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('sequelize-values')();
import {services} from '../database/models/services';

export class ServiceRepository {

  async showPriceList() {
    return await services.findAll({
      where: { deleted: false },
      attributes: ['name', 'time', 'price', 'id'],
      raw: true,
    });
  }

  async SetService(id) {
    return await services.findOne({
        where:{
          id: id
        },
    });
  }
}