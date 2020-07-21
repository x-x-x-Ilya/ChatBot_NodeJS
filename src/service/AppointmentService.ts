import { AppointmentRepository } from '../repositories/AppointmentRepository';
import { ClientService } from './ClientService';
import { mailer } from '../middleware/nodemailer';
const appointmentRepository = new AppointmentRepository();

export class AppointmentService {

  async Booked(id: number): Promise<Array<any>> {
    return await appointmentRepository.showMyAppointments(id);
  }

  async History(id: number): Promise<Array<any>> {
    return await appointmentRepository.showMyHistory(id);
  }

  async Set(id: number, text: string): Promise<any> {
    return await appointmentRepository.Set(id, text);
  }

  async ChangeBarber(id: number, text: string): Promise<any> {
    const user : any = ClientService.prototype.Profile(id);
     mailer(user.email, 'Barbershop notification', 'Your barber replaced successfully');
    return await appointmentRepository.ChangeBarber(id, text);
  }

  async ChangeService(id: number, text: string): Promise<any> {
    const user : any = ClientService.prototype.Profile(id);
    mailer(user.email, 'Barbershop notification', 'Your visit service replaced successfully');
    return await appointmentRepository.ChangeService(id, text);
  }

  async ChangeDate(id: number, text: string): Promise<any> {
    const user : any = ClientService.prototype.Profile(id);
    mailer(user.email, 'Barbershop notification', 'Your visit date replaced successfully');
    return await appointmentRepository.ChangeDate(id, text);
  }

  async Delete(user_id: number, text: string): Promise<any>{
    const user : any = ClientService.prototype.Profile(user_id);
    mailer(user.email, 'Barbershop notification', 'Your appointment canceled successfully');
    return await appointmentRepository.Delete(user_id, text);
  }

  async Free(date: Date): Promise<string> {
    const appointment = await appointmentRepository.freeDateAppointment(date);
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
