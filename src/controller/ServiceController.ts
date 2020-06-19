import {ServiceService} from '../service/ServiceService';
const serviceService = new ServiceService();

export class ServiceController {

  showPriceList() {
    return serviceService.showPriceList();
  }

}
