import {ServiceService} from '../service/ServiceService';
const serviceService = new ServiceService();

export class ServiceController {

  showPriceList() {
    return serviceService.showPriceList();
  }

  selectPrice(msg_should_be_id){
    return serviceService.selectPrice(msg_should_be_id);
  }

}
