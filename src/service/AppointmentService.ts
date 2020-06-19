import {AppointmentRepository} from '../repositories/AppointmentRepository';
const appointmentRepository = new AppointmentRepository();
export class AppointmentService {

  setAppointment(): string {
    return appointmentRepository.setAppointment();
  }

  showMyAppointments(): string {
    return appointmentRepository.showMyAppointments();
  }

  showMyHistory(): string {
    return appointmentRepository.showMyHistory();
  }

  deleteApointment(): string {
    return appointmentRepository.deleteApointment();
  }
}
