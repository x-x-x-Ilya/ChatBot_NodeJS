import {services} from '../database/models/services';

export class ServiceRepository {

  async showPriceList() : Promise<Array<any>> {
    return await services.findAll({
      where: { deleted: false },
      attributes: ['name', 'time', 'price', 'id'],
      raw: true,
    });
  }

  async SetService(id : number) : Promise<any> {
    return await services.findOne({
        where:{
          id: id
        },
    });
  }
}