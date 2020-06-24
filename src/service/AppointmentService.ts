import {AppointmentRepository} from '../repositories/AppointmentRepository';
const appointmentRepository = new AppointmentRepository();

export class AppointmentService {

  setAppointment(): string {
    return appointmentRepository.setAppointment();
  }

  showMyAppointments(id): string {
    return appointmentRepository.showMyAppointments(id);
  }

  async showMyHistory(id): Promise<string>{
    return await appointmentRepository.showMyHistory(id);
  }

  deleteAppointment(should_be_appointment_id): string {
    return appointmentRepository.deleteAppointment(should_be_appointment_id);
  }

  async checkDateAppointment(should_be_appointment_date): Promise<string>{
    const t = should_be_appointment_date.split ('.'),
      Year = t[2],
      Month = parseInt (t[1]) - 1,
      date =  parseInt (t[0]);
    const check_date : Date = new Date (Year, Month, date);

    return await appointmentRepository.checkDateAppointment(check_date);
  }
}
