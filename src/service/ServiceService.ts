import {ServiceRepository} from '../repositories/ServiceRepository';
const serviceRepository = new ServiceRepository();

export class ServiceService {

  showPriceList() {
    return serviceRepository.showPriceList();
  }



}
