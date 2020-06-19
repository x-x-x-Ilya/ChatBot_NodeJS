import {AppService} from '../service/app.service';
const appService = new AppService();

export class ClientController {

  enterEmail(): string {
    return appService.enterEmail();
  }

}
