import {BarberRepository} from '../repositories/BarberRepository';
const barberRepository = new BarberRepository();
export class BarberService {

  showBarberList() : Promise<string>{
    return barberRepository.showBarberList();
  }

  selectBarber() {
    return barberRepository.selectBarber();
  }

}
