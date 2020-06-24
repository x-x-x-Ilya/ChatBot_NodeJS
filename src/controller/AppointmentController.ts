import {AppointmentService} from '../service/AppointmentService';
const appointmentService = new AppointmentService();

export class AppointmentController {

  checkTimeAppointment(dateAndTimeArr): string {
    return appointmentService.checkTimeAppointment(dateAndTimeArr);
  }

  showMyAppointments(id): string {
    return appointmentService.showMyAppointments(id);
  }

  async showMyHistory(id): Promise<string> {
    return await appointmentService.showMyHistory(id);
  }

  async checkDateAppointment(should_be_appointment_date : string): Promise<string> {
    return await appointmentService.checkDateAppointment(should_be_appointment_date);
  }

  async deleteAppointment(should_be_appointment_id): Promise<string> {
    return await appointmentService.deleteAppointment(should_be_appointment_id);
  }

}
