import { services } from '../database/models/services';
import { barbers } from '../database/models/barbers';
import { appointments } from '../database/models/appointments';

export class AppointmentRepository {

  getAll(option: any) {
    return appointments.findAll({
      where: option,
      attributes: ['date', 'id'],
      include: [
        { model: barbers, attributes: ['first_name', 'last_name'] },
        { model: services, attributes: ['name'] },
      ],
    });
  }

  findOne(option: any): any {
    return appointments.findOne({ where: option });
  }

  async update(appointment: any, update: any): Promise<any> {
    await appointment.update(update);
  }

  async changeDate(appointment, date: Date): Promise<any> {
      await appointment.update({ date: date });
  }

  async set(id: number, date: Date,
            barber_id: number, service_id: number): Promise<any> {
      await appointments.create({
        date: date,
        barber_id: barber_id,
        service_id: service_id,
        client_id: id,
        deleted: false,
      });
  }
}
