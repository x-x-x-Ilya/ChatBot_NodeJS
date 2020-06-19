import {AppService} from '../service/app.service';
const appService = new AppService();

export class ServiceController {

  showPriceList() {
    return appService.showPriceList();
  }

}
