import {AppointmentService} from '../service/AppointmentService';
const appointmentService = new AppointmentService();

export class AppointmentController {

  setAppointment(): string {
    return appointmentService.setAppointment();
  }

  showMyAppointments(): string {
    return appointmentService.showMyAppointments();
  }

  showMyHistory(): string {
    return appointmentService.showMyHistory();
  }

  deleteApointment(): string {
    return appointmentService.deleteApointment();
  }

}
