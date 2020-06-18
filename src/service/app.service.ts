import {Repository} from '../repositories/Repository';
const repository = new Repository();
export class AppService {

  showPriceList(): string {
    return repository.showPriceList();
  }

  setService(): string {
    return 'service message';
  }

  enterEmail(): string {
    return 'service message';
  }

}
