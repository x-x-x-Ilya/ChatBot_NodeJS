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

  async free(cmd: string): Promise<any> {
    const date = cmd.substring(7);
    const t = date.split('.'),
      Year = parseInt(t[2]),
      Month = parseInt(t[1]) - 1,
      day = parseInt(t[0]);
    const check_date = new Date(Year, Month, day);
    return await appointmentService.free(check_date);
  }

  async set(user_id: number, cmd: string): Promise<any> {
    const set = cmd.substring(6)
    return await appointmentService.set(user_id, set);
  }

  async changeBarber(user_id: number, cmd: string): Promise<any> {
    const change = cmd.substring(7)
    return await appointmentService.changeBarber(user_id, change);
  }

  async changeService(user_id: number, cmd: string): Promise<any> {
  const change = cmd.substring(7)
    return await appointmentService.changeService(user_id, change);
  }

  async changeDate(user_id: number, cmd: string): Promise<any> {
  const change = cmd.substring(7)
    return await appointmentService.changeDate(user_id, change);
  }

  async delete(user_id: number, cmd: string): Promise<any> {
    const del = cmd.substring(8)
    return await appointmentService.delete(user_id, del);
  }

}
