import {AppointmentRepository} from '../repositories/AppointmentRepository';
const appointmentRepository = new AppointmentRepository();
export class AppointmentService {

  setAppointment(): string {
    return appointmentRepository.setAppointment();
  }

  showMyAppointments(): string {
    return appointmentRepository.showMyAppointments();
  }

  showMyHistory(id): string {
    return appointmentRepository.showMyHistory(id);
  }

  deleteAppointment(): string {
    return appointmentRepository.deleteAppointment();
  }
}
