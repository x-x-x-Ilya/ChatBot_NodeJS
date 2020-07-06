import {AppointmentService} from '../service/AppointmentService';

const appointmentService = new AppointmentService();

export class AppointmentController {

  async showMyAppointments(id : number) : Promise<boolean | string>{
    const appointments = await appointmentService.showMyAppointments(id);
    if (appointments.length != 0) {
      let Response = '\r\n';
      for (let i = 0; i < appointments.length; i++) {
        Response += "[" + appointments[i].id + "] " + appointments[i].date + " " + appointments[i].service.name + " " + appointments[i].barber.first_name + " " + appointments[i].barber.last_name + '\r\n';
      }
      return Response;
    }
    else
      return false;
  }

  async GetAppointment(client_id :number, appointment_id : number) : Promise<any>{
    return await appointmentService.GetAppointment(appointment_id, client_id);
  }

  async showMyHistory(id : number) : Promise<string | boolean>{
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

  async freeDateAppointment(should_be_appointment_date : Date) :Promise<any> {
    return await appointmentService.freeDateAppointment(should_be_appointment_date);
  }

  async deleteAppointment(user_id : number, should_be_appointment_id : number) : Promise<any> {
    return await appointmentService.deleteAppointment(user_id, should_be_appointment_id);
  }

  async updateAppointment(currentAppointment){
    return await appointmentService.updateAppointment(currentAppointment);
  }

  async setAppointment(TelegramBot : any, msg : any, date :Date, barber : any, service : any) : Promise<any>{
    return await appointmentService.setAppointment(TelegramBot, msg, date, barber, service);
  }

}
