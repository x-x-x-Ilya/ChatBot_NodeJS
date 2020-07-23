import { AppointmentService } from '../service/AppointmentService';
import { Message } from '../middleware/TelegramClasses';

const appointmentService = new AppointmentService();

export class AppointmentController {

  async booked(msg: Message): Promise<string> {
    const appointments = await appointmentService.booked(msg.chat.id);
      let Response = '\r\n';
      for (let i = 0; i < appointments.length; i++) {
        Response += '[' + appointments[i].id + '] ' +
          appointments[i].date + ' ' +
          appointments[i].service.name + ' ' +
          appointments[i].barber.first_name + ' ' +
          appointments[i].barber.last_name + '\r\n';
      }
      return Response;
  }

  async history(msg: Message): Promise<string> {
    const allAppointments = await appointmentService.history(msg.chat.id);
      let Response = '\r\n';
      for (let i = 0; i < allAppointments.length; i++) {
        Response += '[' + allAppointments[i].id + '] ' +
          allAppointments[i].date + '\r\n';
      }
      return Response;
  }

  async free(date: string): Promise<any> {
    const t = date.split('.'),
      Year = parseInt(t[2]),
      Month = parseInt(t[1]) - 1,
      day = parseInt(t[0]);
    const check_date = new Date(Year, Month, day);
    if (check_date > new Date())
    return await appointmentService.free(check_date);
    else
      return 'Date should be in future';
  }

  async set(user_id: number, text: string): Promise<any> {
    return await appointmentService.set(user_id, text);
  }

  async changeBarber(user_id: number, text: string): Promise<any> {
    return await appointmentService.changeBarber(user_id, text);
  }

  async changeService(user_id: number, text: string): Promise<any> {
    return await appointmentService.changeService(user_id, text);
  }

  async changeDate(user_id: number, text: string): Promise<any> {
    return await appointmentService.changeDate(user_id, text);
  }

  async delete(user_id: number, text: string): Promise<any> {
    return await appointmentService.delete(user_id, text);
  }

}
