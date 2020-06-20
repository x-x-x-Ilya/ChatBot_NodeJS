import {AppointmentService} from '../service/AppointmentService';
const appointmentService = new AppointmentService();

export class AppointmentController {

  setAppointment(): string {
    return appointmentService.setAppointment();
  }

  showMyAppointments(): string {
    return appointmentService.showMyAppointments();
  }

  showMyHistory(id): string {
    return appointmentService.showMyHistory(id);
  }

  deleteAnointment(): string {
    return appointmentService.deleteAppointment();
  }

}
