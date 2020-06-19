import {AppService} from '../service/app.service';
const appService = new AppService();

export class BarberController {

  showBarberList() {
    return appService.showBarberList();
  }

}
