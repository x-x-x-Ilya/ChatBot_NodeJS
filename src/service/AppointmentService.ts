import {AppointmentRepository} from '../repositories/AppointmentRepository';
const appointmentRepository = new AppointmentRepository();
export class AppointmentService {

  setAppointment(): string {
    return appointmentRepository.setAppointment();
  }

  showMyAppointments(id): string {
    return appointmentRepository.showMyAppointments(id);
  }

  showMyHistory(id): string {
    return appointmentRepository.showMyHistory(id);
  }

  deleteAppointment(should_be_appointment_id): string {
    return appointmentRepository.deleteAppointment(should_be_appointment_id);
  }


  checkDateAppointment(should_be_appointment_date): void {
    return appointmentRepository.checkDateAppointment(should_be_appointment_date);
  }
}
