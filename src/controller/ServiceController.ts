import {ServiceService} from '../service/ServiceService';
const serviceService = new ServiceService();

export class ServiceController {

  async showPriceList() {
    return await serviceService.showPriceList();
  }

}
