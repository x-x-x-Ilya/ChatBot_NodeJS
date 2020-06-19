import {AppointmentRepository} from '../repositories/AppointmentRepository';
const appointmentRepository = new AppointmentRepository();
export class AppointmentService {

  setService(): string {
    return 'service message';
  }

}
