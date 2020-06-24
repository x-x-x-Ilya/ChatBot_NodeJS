import {ServiceService} from '../service/ServiceService';
const serviceService = new ServiceService();

export class ServiceController {

  async showPriceList() {
    return await serviceService.showPriceList();
    /*const services: Array<any> = await serviceService.showPriceList();
      let Response = '\r\n';
      for (let i = 0; i < services.length; i++) {
        Response += Sequelize.getValues(services[i].name) + ' ';
        Response += Sequelize.getValues(services[i].time) + ' ';
        Response += Sequelize.getValues(services[i].price) + '\r\n';
      }
      return Response;*/
  }

  selectPrice(msg_should_be_id){
    return serviceService.selectPrice(msg_should_be_id);
  }

}
