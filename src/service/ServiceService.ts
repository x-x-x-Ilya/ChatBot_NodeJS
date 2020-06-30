import {ServiceRepository} from '../repositories/ServiceRepository';
const serviceRepository = new ServiceRepository();

export class ServiceService {

  async showPriceList() : Promise<any>{
    return await serviceRepository.showPriceList();

    }


  async SetService(id : number) : Promise<any>{
    return await serviceRepository.SetService(id);
  }

}
