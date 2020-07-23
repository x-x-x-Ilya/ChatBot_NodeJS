import { ServiceService } from '../service/ServiceService';
const serviceService = new ServiceService();

export class ServiceController {

  async list(): Promise<string> {
    const services: Array<any> = await serviceService.list();
    if (services.length == 0) return 'There are no services, write me later';
      let Response = '\r\n';
      for (let i = 0; i < services.length; i++) {
        Response += '[' + services[i].id + '] ' + services[i].name + '\t' +
          services[i].time + '\t' + services[i].price.toString() + '\r\n';
      }
      return Response;
  }

}
