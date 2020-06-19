// eslint-disable-next-line @typescript-eslint/no-var-requires
const Barber = require('../database/models/barbers');

export class BarberRepository {

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async showBarberList() {
    await Barber.findAll({
      attributes: ['email', 'first_name', 'last_name']
    }).then((barber) => {
      console.log(barber.map(barber => barber.toJSON()));
    });
    return 'bla';

  }
}