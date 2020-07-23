import { ServiceRepository } from '../repositories/ServiceRepository';
const serviceRepository = new ServiceRepository();

export class ServiceService {
  async list(): Promise<any> {
    return await serviceRepository.list();
  }
}
