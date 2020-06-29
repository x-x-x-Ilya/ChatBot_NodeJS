import {Op} from 'sequelize';
import {services} from '../database/models/services';
import {barbers} from '../database/models/barbers';
import {appointments} from '../database/models/appointments';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('sequelize-values')();

export class AppointmentRepository {
  async GetAppointment(appoinment_id, client_id) {
    return await appointments.findOne({
      where:{
        id:appoinment_id,
        client_id:client_id,
        deleted: false
      }
    })
  }

  async showMyAppointments(id) {
    return await appointments.findAll({
      where: {
        client_id: id,
        date: {
          [Op.gte]: new Date()
        },
        deleted: false
      },
      attributes: ['date', 'id'],
      include: [
        {
          model: barbers,
          attributes: ['first_name', 'last_name'],
        }, {
          model: services,
          attributes: ['name'],
        }]
    });
  }

  async showMyHistory(id) {
    return await appointments.findAll(
      {
        where: {
          client_id: id,
          deleted: false,
          date: {
            [Op.lte]: new Date()
          },
        },
        raw: true
      });
  }

  async freeDateAppointment(check_date: Date) {
    const nextDay = new Date(check_date.getTime());
    nextDay.setDate(nextDay.getDate() + 1);
    return await appointments.findAll({
      where: {
        date: {
          [Op.between]: [check_date, nextDay]
        },
        deleted: false
      },
      raw: true
    });
  }

  async deleteAppointment(appointment) {
    //const appointment = await appointments.findOne({ where: { id: parseInt(should_be_appointment_id, 10) } });
    if (appointment != null) {
      await appointment.update({
        deleted: true
      });
      return appointment.deleted == true;
    }
    return false;
  }

  async setAppointment(TelegramBot, msg, date, barber, service) {
    try {
      const appointment = await appointments.create({
        // id по умолчанию
        date: date,
        barber_id: barber.id,
        service_id: service.id,
        client_id: msg.chat.id,
        deleted: false
      })
      if (appointment)
        return await appointments.findOne({
          where: {
            id: appointment.id
          },
          attributes: ['date', 'id'],
          include: [
            {
              model: barbers,
              attributes: ['first_name', 'last_name'],
            }, {
              model: services,
              attributes: ['name'],
            }]
        });
      else
        return false;
    } catch (e) {
      console.log(e);
    }
  }
}