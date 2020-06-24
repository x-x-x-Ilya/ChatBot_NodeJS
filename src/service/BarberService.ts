// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('sequelize-values')();
import {BarberRepository} from '../repositories/BarberRepository';
const barberRepository = new BarberRepository();

export class BarberService {

  async showBarberList() {
    const barbers : Array<any> = await barberRepository.showBarberList();
    let Response = '\r\n';
      for (let i = 0; i < barbers.length; i++) {
        Response += "[" + (i+1) + "] = " + Sequelize.getValues(barbers[i].first_name) + ' ';
        Response += Sequelize.getValues(barbers[i].last_name) + '\r\n';
      }
    return Response;
  }

  selectBarber() {
    return barberRepository.selectBarber();
  }

}
