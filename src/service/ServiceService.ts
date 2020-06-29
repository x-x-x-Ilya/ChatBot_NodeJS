
import {ServiceRepository} from '../repositories/ServiceRepository';
const serviceRepository = new ServiceRepository();

export class ServiceService {

  async showPriceList() {
    return await serviceRepository.showPriceList();

    }


  async SetService(id){
    return await serviceRepository.SetService(id);
  }

}
