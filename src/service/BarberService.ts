import {BarberRepository} from '../repositories/BarberRepository';
const repository = new BarberRepository();
export class BarberService {

  showBarberList() {
    return repository.showBarberList();
  }

}
