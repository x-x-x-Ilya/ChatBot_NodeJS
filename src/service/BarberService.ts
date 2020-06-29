import {BarberRepository} from '../repositories/BarberRepository';
const barberRepository = new BarberRepository();

export class BarberService {

  async showBarberList() {
    return await barberRepository.showBarberList();
  }

  async selectBarber(id) {
    return await barberRepository.selectBarber(id);
  }

}
