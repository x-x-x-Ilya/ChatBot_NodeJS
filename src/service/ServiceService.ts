import { ServiceRepository } from '../repositories/ServiceRepository';
const serviceRepository = new ServiceRepository();

export class ServiceService {

  async amenitiesList(): Promise<any> {
    return await serviceRepository.amenitiesList();
  }

  async barberList(): Promise<any> {
    return await serviceRepository.barberList();
  }
}
