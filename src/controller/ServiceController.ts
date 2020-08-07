import { ServiceService } from '../service/ServiceService';
const serviceService = new ServiceService();

export class ServiceController {

  async amenitiesList(): Promise<string> {
    return  await serviceService.amenitiesList();
  }

  async barberList(): Promise<string> {
    return await serviceService.barberList();
  }


}
