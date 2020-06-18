import {BarberRepository} from '../repositories/BarberRepository';
const repository = new BarberRepository();
export class AppService {

  showPriceList() {
    return repository.showBarberList();
  }

  setService(): string {
    return 'service message';
  }

  enterEmail(): string {
    return 'service message';
  }

}
