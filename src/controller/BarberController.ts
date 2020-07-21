import { BarberService } from '../service/BarberService';
const barberService = new BarberService();

export class BarberController {
  async List(): Promise<string> {
    const barbers = await barberService.List();
      let Response = '\r\n';
      for (let i = 0; i < barbers.length; i++) {
        Response += '[' + barbers[i].id + '] ' + barbers[i].first_name + ' ';
        Response += barbers[i].last_name + '\r\n';
      }
      return Response;
  }
}