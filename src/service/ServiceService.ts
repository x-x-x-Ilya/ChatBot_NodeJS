import { ServiceRepository } from '../repositories/ServiceRepository';
const serviceRepository = new ServiceRepository();

export class ServiceService {
  async List(): Promise<any> {
    return await serviceRepository.showPriceList();
  }
}
