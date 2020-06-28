import {AppointmentService} from '../service/AppointmentService';
const appointmentService = new AppointmentService();

export class AppointmentController {

  async showMyAppointments(id) {
    return await appointmentService.showMyAppointments(id);
  }
  async GetAppointment(client_id, appoinment_id){
    return await appointmentService.GetAppointment(appoinment_id, client_id);

  }
  async showMyHistory(id): Promise<string> {
    return await appointmentService.showMyHistory(id);
  }

  async freeDateAppointment(should_be_appointment_date) {
    return await appointmentService.freeDateAppointment(should_be_appointment_date);
  }

  async deleteAppointment(should_be_appointment_id): Promise<string> {
    return await appointmentService.deleteAppointment(should_be_appointment_id);
  }

  async setAppointment(TelegramBot, msg, date, barber, service){
    return await appointmentService.setAppointment(TelegramBot, msg, date, barber, service);
  }

}
