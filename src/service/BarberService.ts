import {BarberRepository} from '../repositories/BarberRepository';
const repository = new BarberRepository();
export class BarberService {

  showBarberList() : Promise<string>{
    return repository.showBarberList();
  }

  selectBarber() {
    return repository.selectBarber();
  }

}
