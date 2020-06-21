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

  deleteAnointment(should_be_appointment_id): string {
    return appointmentService.deleteAppointment(should_be_appointment_id);
  }

  checkDateAppointment(should_be_appointment_date){
    return appointmentService.checkDateAppointment(should_be_appointment_date);
  }
}
