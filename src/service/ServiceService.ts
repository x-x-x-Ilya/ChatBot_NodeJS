// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('sequelize-values')();
import {ServiceRepository} from '../repositories/ServiceRepository';
const serviceRepository = new ServiceRepository();

export class ServiceService {

  async showPriceList() {
    const services: Array <any> = await serviceRepository.showPriceList();
      let Response = '\r\n';
      for (let i = 0; i < services.length; i++) {
        const cur_name  : string = Sequelize.getValues(services[i].name);
        const cur_time  : string = Sequelize.getValues(services[i].time);
        const cur_price : string = Sequelize.getValues(services[i].price).toString();

        Response += "[" + Sequelize.getValues(services[i].id) + "] " + cur_name + '\t';
        Response += cur_time + '\t';
        Response += cur_price + '\r\n';
      }
      return Response;
    }


  async SetService(id){
    return await serviceRepository.SetService(id);
  }

}
