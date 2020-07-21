import { AppointmentService } from '../service/AppointmentService';
import { Message } from '../middleware/TelegramClasses';

const appointmentService = new AppointmentService();

export class AppointmentController {

  async Booked(msg: Message): Promise<string> {
    const appointments = await appointmentService.Booked(msg.chat.id);
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

  async History(msg: Message): Promise<string> {
    const allAppointments = await appointmentService.History(msg.chat.id);
      let Response = '\r\n';
      for (let i = 0; i < allAppointments.length; i++) {
        Response += '[' + allAppointments[i].id + '] ' +
          allAppointments[i].date + '\r\n';
      }
      return Response;
  }

  async Free(date: string): Promise<any> {
    const t = date.split('.'),
      Year = parseInt(t[2]),
      Month = parseInt(t[1]) - 1,
      day = parseInt(t[0]);
    const check_date = new Date(Year, Month, day);
    if (check_date > new Date())
    return await appointmentService.Free(check_date);
    else
      return 'Date should be in future';
  }

  async Set(user_id: number, text: string): Promise<any> {
    return await appointmentService.Set(user_id, text);
  }

  async ChangeBarber(user_id: number, text: string): Promise<any> {
    return await appointmentService.ChangeBarber(user_id, text);
  }

  async ChangeService(user_id: number, text: string): Promise<any> {
    return await appointmentService.ChangeService(user_id, text);
  }

  async ChangeDate(user_id: number, text: string): Promise<any> {
    return await appointmentService.ChangeDate(user_id, text);
  }

  async Delete(user_id: number, text: string): Promise<any> {
    return await appointmentService.Delete(user_id, text);
  }

}
