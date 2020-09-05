import { AppointmentService } from '../service/AppointmentService';
import { Message } from '../middleware/TelegramClasses';

const appointmentService = new AppointmentService();

export class AppointmentController {

  async booked(msg: Message): Promise<string> {
    return await appointmentService.booked(msg.chat.id);
  }

  async history(msg: Message): Promise<string> {
    return await appointmentService.history(msg.chat.id);
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
    const set = cmd.substring(6);
    return await appointmentService.set(user_id, set);
  }

  async changeBarber(user_id: number, cmd: string): Promise<any> {
    const change = cmd.substring(7);
    return await appointmentService.change(user_id, change, 'barber_id');
  }

  async changeService(user_id: number, cmd: string): Promise<any> {
    const change = cmd.substring(7);
    return await appointmentService.change(user_id, change, 'service_id');
  }

  async changeDate(user_id: number, cmd: string): Promise<any> {
  const change = cmd.substring(7)
    return await appointmentService.changeDate(user_id, change);
  }

  async delete(user_id: number, cmd: string): Promise<any> {
    const del = cmd.substring(8)
    return await appointmentService.change(user_id, del,'deleted');
  }

}
