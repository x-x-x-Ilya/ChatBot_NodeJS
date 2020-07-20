import { AppointmentService } from '../service/AppointmentService';

const appointmentService = new AppointmentService();

export class AppointmentController {

  async Booked(msg: any): Promise<boolean | string> {
    const appointments = await appointmentService.showMyAppointments(msg.chat.id);
    if (appointments.length != 0) {
      let Response = '\r\n';
      for (let i = 0; i < appointments.length; i++) {
        Response += '[' + appointments[i].id + '] ' +
          appointments[i].date + ' ' +
          appointments[i].service.name + ' ' +
          appointments[i].barber.first_name + ' ' +
          appointments[i].barber.last_name + '\r\n';
      }
      return Response;
    } else return false;
  }

  async History(msg: any): Promise<string | boolean> {
    const allAppointments = await appointmentService.showMyHistory(msg.chat.id);
    if (allAppointments.length != 0) {
      let Response = '\r\n';
      for (let i = 0; i < allAppointments.length; i++) {
        Response += '[' + allAppointments[i].id + '] ' +
          allAppointments[i].date + '\r\n';
      }
      return Response;
    }
    return false;
  }

  async Free(date: any): Promise<any> {
    const t = date.split('.'),
      Year = t[2],
      Month = parseInt(t[1]) - 1,
      day = parseInt(t[0]);
    const check_date = new Date(Year, Month, day);
    if (check_date > new Date())
    return await appointmentService.freeDateAppointment(check_date);
    else
      return 'Date should be in future';
  }

  async Set(user_id: any, msg: any): Promise<any> {
    return await appointmentService.Set(user_id, msg);
  }

  async ChangeBarber(user_id, msg){
    return await appointmentService.ChangeBarber(user_id, msg);
  }

  async ChangeService(user_id, msg){
    return await appointmentService.ChangeService(user_id, msg);
  }

  async ChangeDate(user_id, msg){
    return await appointmentService.ChangeDate(user_id, msg);
  }

  async Delete(user_id, msg){
    return await appointmentService.Delete(user_id, msg);
  }

}


  /*
  async deleteAppointment(
    user_id: number,
    should_be_appointment_id: number,
  ): Promise<any> {
    return await appointmentService.deleteAppointment(
      user_id,
      should_be_appointment_id,
    );
  }

  async GetAppointment(
    client_id: number,
    appointment_id: number,
  ): Promise<any> {
    return await appointmentService.GetAppointment(appointment_id, client_id);
  }

  async updateAppointment(currentAppointment) {
    return await appointmentService.updateAppointment(currentAppointment);
  }
*/