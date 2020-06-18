// eslint-disable-next-line @typescript-eslint/no-var-requires
const Barber = require('../database/models/barber');

export class BarberRepository {

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async showBarberList() {
    try {
      const r = await Barber.findAll();
      console.log(r);
      return r;
    } catch (e) {
      console.log(e);
    }
    }

}