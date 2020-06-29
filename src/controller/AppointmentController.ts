import {AppointmentService} from '../service/AppointmentService';

const appointmentService = new AppointmentService();

export class AppointmentController {

  async showMyAppointments(id) {
    const appointments = await appointmentService.showMyAppointments(id);
    if (appointments.length != 0) {
      let Response = '\r\n';
      let temp;
      for (let i = 0; i < appointments.length; i++) {
        Response += "[" + appointments[i].id + "] " + appointments[i].date + " " + appointments[i].service.name + " " + appointments[i].barber.first_name + " " + appointments[i].barber.last_name + '\r\n';
      }
      return Response;
    }
    else
      return false;
  }
  async GetAppointment(client_id, appoinment_id){
    return await appointmentService.GetAppointment(appoinment_id, client_id);

  }
  async showMyHistory(id){
    const allAppointments = await appointmentService.showMyHistory(id);
    if (allAppointments.length != 0) {
      let Response = '\r\n';
      for (let i = 0; i < allAppointments.length; i++) {
        Response += "[" + allAppointments[i].id + "] " + allAppointments[i].date + '\r\n';
      }
      return Response;
    }
    return false;
  }

  async freeDateAppointment(should_be_appointment_date) {
    return await appointmentService.freeDateAppointment(should_be_appointment_date);
  }

  async deleteAppointment(user_id, should_be_appointment_id) {
    return await appointmentService.deleteAppointment(user_id, should_be_appointment_id);
  }

  async setAppointment(TelegramBot, msg, date, barber, service){
    return await appointmentService.setAppointment(TelegramBot, msg, date, barber, service);
  }

}
