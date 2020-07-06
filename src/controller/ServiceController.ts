import { ServiceService } from '../service/ServiceService';
const serviceService = new ServiceService();

export class ServiceController {
  async showPriceList(): Promise<string | boolean> {
    const services: Array<any> = await serviceService.showPriceList();
    if (services.length != 0) {
      let Response = '\r\n';
      for (let i = 0; i < services.length; i++) {
        Response += '[' + services[i].id + '] ' + services[i].name + '\t';
        Response +=
          services[i].time + '\t' + services[i].price.toString() + '\r\n';
      }
      return Response;
    }
    return false;
  }

  async SetService(id: number): Promise<any> {
    return await serviceService.SetService(id);
  }
}
