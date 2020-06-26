import {AppointmentService} from '../service/AppointmentService';
const appointmentService = new AppointmentService();

export class AppointmentController {

  async showMyAppointments(id) {
    return await appointmentService.showMyAppointments(id);
  }

  async setAppointment(date, id) {
    return await appointmentService.setAppointment(date, id);
  }

  async showMyHistory(id): Promise<string> {
    return await appointmentService.showMyHistory(id);
  }

  async checkDateAppointment(should_be_appointment_date) {
    return await appointmentService.checkDateAppointment(should_be_appointment_date);
  }

  async deleteAppointment(should_be_appointment_id): Promise<string> {
    return await appointmentService.deleteAppointment(should_be_appointment_id);
  }

}
