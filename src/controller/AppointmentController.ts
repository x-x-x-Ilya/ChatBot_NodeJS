import {AppService} from '../service/app.service';
const appService = new AppService();

export class AppointmentController {

  setService(): string {
    return appService.setService();
  }

}
