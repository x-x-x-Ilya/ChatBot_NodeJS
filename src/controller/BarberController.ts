import { BarberService } from '../service/BarberService';
const barberService = new BarberService();

export class BarberController {
  async list(): Promise<string> {
    const barbers: Array<any> = await barberService.list();
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