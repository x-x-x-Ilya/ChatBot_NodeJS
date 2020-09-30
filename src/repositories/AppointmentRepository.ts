import { services } from '../database/sequelize/models/services';
import { barbers } from '../database/sequelize/models/barbers';
import { appointments } from '../database/sequelize/models/appointments';

export class AppointmentRepository {

  getAll(option: any): Promise<any[]> {
    return appointments
    .findAll({
      where: option,
      attributes: ['appointment_date', 'id'],
      include: [
        { model: barbers, attributes: ['first_name', 'last_name'] },
        { model: services, attributes: ['name'] },
      ],
    });
  }

  findOne(option: any): Promise<any> {
    return appointments.findOne({ where: option });
  }

  async update(appointment: any, update: any): Promise<any> {
    return await appointment.update(update);
  }

  async changeDate(appointment: any, date: Date): Promise<boolean> {
    const result = await appointment.update(
      { appointment_date: date },
      {
        returning: true,
        plain: true
      });
    if (result === false) return false;
    return result.dataValues.appointment_date === date;
  }

  async set(id: number, date: Date,
            barber_id: number, service_id: number): Promise<any> {
      return appointments.create({
        appointment_date: date,
        barber_id: barber_id,
        service_id: service_id,
        client_id: id,
        deleted: false,
      });
  }

}
