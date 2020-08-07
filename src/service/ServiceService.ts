import { ServiceRepository } from '../repositories/ServiceRepository';
const serviceRepository = new ServiceRepository();

export class ServiceService {

  async amenitiesList(): Promise<string> {
    const services: Array<any> = await serviceRepository.amenitiesList();
    if (services.length == 0)
      return 'There are no services, write me later';
    let Response = '\r\n';
    for (let i = 0; i < services.length; i++) {
      Response += '[' + services[i].id + '] ' + services[i].name + '\t' +
        services[i].time + '\t' + services[i].price.toString() + '\r\n';
    }
    return Response;
  }

  async barberList(): Promise<string> {
    const barbers: Array<any> = await serviceRepository.barberList();
    if(barbers.length == 0)
      return 'There are no barbers, please write me later';
    let Response = '\r\n';
    for (let i = 0; i < barbers.length; i++) {
      Response += '[' + barbers[i].id + '] ' + barbers[i].first_name + ' '
        + barbers[i].last_name + '\r\n';
    }
    return Response;
  }
}
