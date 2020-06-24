import {ServiceService} from '../service/ServiceService';
const serviceService = new ServiceService();

export class ServiceController {

  async showPriceList() {
    return await serviceService.showPriceList();
  }

  selectPrice(msg_should_be_id){
    return serviceService.selectPrice(msg_should_be_id);
  }

}
