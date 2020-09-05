import { AppointmentService } from '../service/AppointmentService';
import { Message } from '../middleware/TelegramClasses';

const service = new AppointmentService();

export class AppointmentController {

  async booked(msg: Message): Promise<string> {
    return await service.booked(msg.chat.id);
  }

  async history(msg: Message): Promise<string> {
    return await service.history(msg.chat.id);
  }

  async free(cmd: string): Promise<any> {
    const date = cmd.substring(7);
    const t = date.split('.');
    const Year = parseInt(t[2]);
    const Month = parseInt(t[1]) - 1;
    const day = parseInt(t[0]);
    const check_date = new Date(Year, Month, day);
    return await service.free(check_date);
  }

  async set(user_id: number, cmd: string): Promise<any> {
    const set = cmd.substring(6);
    return await service.set(user_id, set);
  }

  async changeBarber(user_id: number, cmd: string): Promise<any> {
    const change = cmd.substring(7);
    return await service.change(user_id, change, 'barber_id');
  }

  async changeService(user_id: number, cmd: string): Promise<any> {
    const change = cmd.substring(7);
    return await service.change(user_id, change, 'service_id');
  }

  async changeDate(user_id: number, cmd: string): Promise<any> {
  const change = cmd.substring(7)
    return await service.changeDate(user_id, change);
  }

  async delete(user_id: number, cmd: string): Promise<any> {
    const del = cmd.substring(8)
    return await service.change(user_id, del,'deleted');
  }

}
