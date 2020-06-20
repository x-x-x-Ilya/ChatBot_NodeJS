import {ServiceRepository} from '../repositories/ServiceRepository';
const serviceRepository = new ServiceRepository();

export class ServiceService {

  showPriceList() {
    return serviceRepository.showPriceList();
  }

  selectPrice(msg_should_be_id){
    return serviceRepository.selectPrice(msg_should_be_id);
  }

}
