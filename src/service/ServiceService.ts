// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('sequelize-values')();
import {ServiceRepository} from '../repositories/ServiceRepository';
const serviceRepository = new ServiceRepository();

export class ServiceService {

  async showPriceList() {
    const services: Array <any> = await serviceRepository.showPriceList();
      let Response = '\r\n';
      for (let i = 0; i < services.length; i++) {
        Response += Sequelize.getValues(services[i].name) + ' ';
        Response += Sequelize.getValues(services[i].time) + ' ';
        Response += Sequelize.getValues(services[i].price) + '\r\n';
      }
      return Response;
    }


  selectPrice(msg_should_be_id){
    return serviceRepository.selectPrice(msg_should_be_id);
  }

}
