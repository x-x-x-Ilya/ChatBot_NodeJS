import {AppointmentService} from '../service/AppointmentService';
const appointmentService = new AppointmentService();

export class AppointmentController {

  setAppointment(): string {
    return appointmentService.setAppointment();
  }

  showMyAppointments(id): string {
    return appointmentService.showMyAppointments(id);
  }

  async showMyHistory(id): Promise<string> {
    return await appointmentService.showMyHistory(id);
  }

  async checkDateAppointment(should_be_appointment_date): Promise<string> {
    return await appointmentService.checkDateAppointment(should_be_appointment_date);
  }

  deleteAppointment(should_be_appointment_id): string {
    return appointmentService.deleteAppointment(should_be_appointment_id);
  }

}
