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

  async checkDateAppointment(should_be_appointment_date : string): Promise<string> {

    should_be_appointment_date = should_be_appointment_date.substring(6, should_be_appointment_date.length);

    return await appointmentService.checkDateAppointment(should_be_appointment_date);
  }

  deleteAppointment(should_be_appointment_id): string {
    return appointmentService.deleteAppointment(should_be_appointment_id);
  }

}
