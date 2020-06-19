import {BarberRepository} from '../repositories/BarberRepository';
const repository = new BarberRepository();
export class AppService {

  showPriceList() {
    return 'no code here now';//repository.showPriceList();
  }

  showBarberList() {
    return repository.showBarberList();
  }

  setService(): string {
    return 'service message';
  }

  enterEmail(): string {
    return 'service message';
  }

}
