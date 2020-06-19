import {AppointmentService} from '../service/AppointmentService';
const appointmentService = new AppointmentService();

export class AppointmentController {

  setService(): string {
    return appointmentService.setService();
  }

}
