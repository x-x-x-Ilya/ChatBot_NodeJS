import {AppointmentRepository} from '../repositories/AppointmentRepository';
const appointmentRepository = new AppointmentRepository();

export class AppointmentService {

  async showMyAppointments(id) {
    return await appointmentRepository.showMyAppointments(id);
  }

  async showMyHistory(id): Promise<string>{
    return await appointmentRepository.showMyHistory(id);
  }

  async setAppointment(date, time, id){
    return await appointmentRepository.setAppointment(date, time, id);
  }

  async deleteAppointment(should_be_appointment_id): Promise<string> {
    return await appointmentRepository.deleteAppointment(should_be_appointment_id);
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
