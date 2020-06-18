import {AppService} from '../service/app.service';
const appService = new AppService();
export class AppController {

  showPriceList(): string {
    return appService.showPriceList()
  }

  setService(): string {
    return appService.setService();
  }

  enterEmail(): string {
    return appService.enterEmail();
  }

}
