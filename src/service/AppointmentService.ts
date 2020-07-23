import { AppointmentRepository } from '../repositories/AppointmentRepository';
import { ClientService } from './ClientService';
import { mailer } from '../middleware/nodemailer';
const appointmentRepository = new AppointmentRepository();

export class AppointmentService {

  async booked(id: number): Promise<Array<any>> {
    return await appointmentRepository.booked(id);
  }

  async history(id: number): Promise<Array<any>> {
    return await appointmentRepository.history(id);
  }

  async set(id: number, text: string): Promise<any> {
    return await appointmentRepository.set(id, text);
  }

  async changeBarber(id: number, text: string): Promise<any> {
    const user : any = ClientService.prototype.profile(id);
    mailer(user.email, 'Barbershop notification', 'Your barber replaced successfully');
    return await appointmentRepository.changeBarber(id, text);
  }

  async changeService(id: number, text: string): Promise<any> {
    const user : any = ClientService.prototype.profile(id);
    mailer(user.email, 'Barbershop notification', 'Your visit service replaced successfully');
    return await appointmentRepository.changeService(id, text);
  }

  async changeDate(id: number, text: string): Promise<any> {
    const user : any = ClientService.prototype.profile(id);
    mailer(user.email, 'Barbershop notification', 'Your visit date replaced successfully');
    return await appointmentRepository.changeDate(id, text);
  }

  async delete(user_id: number, text: string): Promise<any>{
    const user : any = ClientService.prototype.profile(user_id);
    mailer(user.email, 'Barbershop notification', 'Your appointment canceled successfully');
    return await appointmentRepository.delete(user_id, text);
  }

  async free(date: Date): Promise<string> {
    const appointment = await appointmentRepository.free(date);
    if (appointment.length == 0) {
      return 'We are free from 10:00 to 22:00';
    }
    let found_in_sec = [];
    found_in_sec.sort((a: number, b: number) => {
      if (a > b) return b;
      else return a;
    });
    for (let i = 0; i < appointment.length; i++) {
      found_in_sec.push(
        appointment[i].date.getHours() * 3600 +
        appointment[i].date.getMinutes() * 60,
      );
    }
    found_in_sec = found_in_sec.sort();
    let R = 'We are free:\r\n';
    if (found_in_sec[0] != 36000)
      R += 'from 10:00 to ' +
        found_in_sec[0] / 3600 + ':' +
        (found_in_sec[0] % 3600) / 60 + '\r\n';
    for (let i = 0; i < found_in_sec.length - 1; i++) {
      R += 'from ' +
        (found_in_sec[i] + 3600) / 3600 + ':' +
        ((found_in_sec[i] + 3600) % 3600) / 60 + ' to ' +
        found_in_sec[i + 1] / 3600 + ':' +
        (found_in_sec[i + 1] % 3600) / 60 + '\r\n';
    }
    if (found_in_sec[found_in_sec.length - 1] != 79200) {
      R += 'from ' +
        found_in_sec[found_in_sec.length - 1] / 3600 + ':' +
        (found_in_sec[found_in_sec.length - 1] % 3600) / 60 +
        ' to 22:00\r\n';
    }
    return R;
  }

}
