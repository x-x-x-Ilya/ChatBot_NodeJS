import { Op } from 'sequelize';
import { services } from '../database/models/services';
import { barbers } from '../database/models/barbers';
import { appointments } from '../database/models/appointments';

export class AppointmentRepository {
  async GetAppointment(
    appointment_id: number,
    client_id: number,
  ): Promise<any> {
    return await appointments.findOne({
      where: {
        id: appointment_id,
        client_id: client_id,
        deleted: false,
      },
    });
  }

  async showMyAppointments(id: number): Promise<Array<any>> {
    return await appointments.findAll({
      where: {
        client_id: id,
        deleted: false,
        date: { [Op.gte]: new Date() },
      },
      attributes: ['date', 'id'],
      include: [
        {
          model: barbers,
          attributes: ['first_name', 'last_name'],
        },
        {
          model: services,
          attributes: ['name'],
        },
      ],
    });
  }

  async showMyHistory(id: number): Promise<Array<any>> {
    return await appointments.findAll({
      where: {
        client_id: id,
        deleted: false,
        date: {
          [Op.lte]: new Date(),
        },
      },
      raw: true,
    });
  }

  async freeDateAppointment(check_date: Date): Promise<Array<any>> {
    const nextDay = new Date(check_date.getTime());
    nextDay.setDate(nextDay.getDate() + 1);
    return await appointments.findAll({
      where: {
        date: {
          [Op.between]: [check_date, nextDay],
        },
        deleted: false,
      },
      raw: true,
    });
  }

  async deleteAppointment(appointment: any): Promise<boolean> {
    //const appointment = await appointments.findOne({ where: { id: parseInt(should_be_appointment_id, 10) } });
    if (appointment != null) {
      await appointment.update({
        deleted: true,
      });
      return appointment.deleted == true;
    }
    return false;
  }

  async setAppointment(
    TelegramBot: any,
    msg: any,
    date: Date,
    barber: any,
    service: any,
  ): Promise<any> {
    try {
      const appointment = await appointments.create({
        // id по умолчанию
        date: date,
        barber_id: barber.id,
        service_id: service.id,
        client_id: msg.chat.id,
        deleted: false,
      });
      if (appointment)
        return await appointments.findOne({
          where: {
            id: appointment.id,
          },
          attributes: ['date', 'id'],
          include: [
            {
              model: barbers,
              attributes: ['first_name', 'last_name'],
            },
            {
              model: services,
              attributes: ['name'],
            },
          ],
        });
      else return false;
    } catch (e) {
      console.log(e);
    }
  }

  async updateAppointment(currentAppointment) {
    const appointment = await appointments.findOne({
      where: {
        id: currentAppointment.id,
        client_id: currentAppointment.client_id,
      },
    });
    appointment.update({
      id: currentAppointment.id,
      service_id: currentAppointment.service,
      barber_id: currentAppointment.barber_id,
      date: currentAppointment.date,
      deleted: currentAppointment.deleted,
    });
  }
}
