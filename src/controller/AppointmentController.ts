import { TelegramMessage } from 'src/middleware/TelegramClasses';
import { AppointmentService } from '../service/AppointmentService';

const service = new AppointmentService();

export class AppointmentController {
  async booked(msg: TelegramMessage): Promise<string> {
    return await service.booked(msg.chat.id);
  }

  async history(msg: TelegramMessage): Promise<string> {
    return await service.history(msg.chat.id);
  }

  async free(cmd: string): Promise<any> {
    const date = cmd.substring(7).split('.');
    const year = parseInt(date[2]);
    const month = parseInt(date[1]) - 1;
    const day = parseInt(date[0]);
    const check_date = new Date(year, month, day);
    return await service.free(check_date);
  }

  async set(user_id: number, cmd: string): Promise<any> {
    return await service.set(user_id, cmd.substring(6));
  }

  async changeBarber(user_id: number, cmd: string): Promise<any> {
    return await service.change(user_id, cmd.substring(7), 'barber_id');
  }

  async changeService(user_id: number, cmd: string): Promise<any> {
    return await service.change(user_id, cmd.substring(7), 'service_id');
  }

  async changeDate(user_id: number, cmd: string): Promise<any> {
    return await service.changeDate(user_id, cmd.substring(7));
  }

  async delete(user_id: number, cmd: string): Promise<any> {
    return await service.change(user_id, cmd.substring(8), 'deleted');
  }
}
