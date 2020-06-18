// eslint-disable-next-line @typescript-eslint/no-var-requires
const Barber = require('../database/models/barber');

export class BarberRepository {

  showBarberList() {
    return Barber.findAll({});
  }

}