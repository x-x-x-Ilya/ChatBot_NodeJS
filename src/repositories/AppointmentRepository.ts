import { Op } from 'sequelize';
import { services } from '../database/models/services';
import { barbers } from '../database/models/barbers';
import { appointments } from '../database/models/appointments';
import { LogError } from '../middleware/logging';

export class AppointmentRepository {

  async Booked(id: number): Promise<Array<any>> {
    return appointments.findAll({
      where: {
        client_id: id, deleted: false,
        date: { [Op.gte]: new Date() },
      },
      attributes: ['date', 'id'],
      include: [{
          model: barbers, attributes: ['first_name', 'last_name'],
      },
        {
          model: services, attributes: ['name'],
        },
      ],
    });
  }

  async History(id: number): Promise<Array<any>> {
    return appointments.findAll({
      where: {
        client_id: id, deleted: false,
        date: { [Op.lte]: new Date(), },
      }
    });
  }

  async Free(check_date: Date): Promise<Array<any>> {
    const nextDay = new Date(check_date.getTime());
    nextDay.setDate(nextDay.getDate() + 1);
    return appointments.findAll({
      where: {
        date: { [Op.between]: [check_date, nextDay] },
        deleted: false,
      },
    });
  }

  async ChangeBarber(id, msg): Promise<any>{
    const data = msg.split(' ');
    const appointment = await appointments.findOne({
      where: {
        deleted: false,
        client_id: id,
        id: data[0]
      }
    });
    if(data[1] == undefined)
      data[1] = 'default';
    await appointment.update({
      barber_id: data[1]
    });
    return 'Your appointment updated';
  }

  async ChangeService(id: number, text: string): Promise<any>{
    const data = text.split(' ');
    const appointment = await appointments.findOne({
      where: {
        deleted: false,
        client_id: id,
        id: data[0]
      }
    });
    if(data[1] == undefined)
      data[1] = 'default'
    await appointment.update({
      service_id: data[1]
    });
    return 'Your appointment updated';
  }

  async ChangeDate(id: number, text: string): Promise<any>{
    const data = text.split(' ');
    const appointment = await appointments.findOne({
      where: {
        deleted: false,
        client_id: id,
        id: data[0]
      }
    });
    if (data[1] == undefined)
      data[1] = appointment.date;
    const date = new Date(data[1]);
    if(data[2] != undefined){
    const time = data[2].split(':');
    date.setHours(parseInt(time[0]));
    date.setMinutes(parseInt(time[1]));}

    await appointment.update({
      date: date
    });
    return 'Your appointment updated';
  }

  async Delete(user_id: number, text: string): Promise<any>{
    const appointment = await appointments.findOne({
      where: {
        deleted: false,
        client_id: user_id,
        id: text
      }
    });
    appointment.update({
      deleted: true
    })
    return 'Deleted successfully';
  }

  async Set(id: number, msg: string): Promise<any> {
    const data = msg.split(' ');
    const date = new Date(data[0]);
    const time = data[1].split(':');
    date.setHours(parseInt(time[0]));
    date.setMinutes(parseInt(time[1]));
    try {
      await appointments.create({
        date: date,
        barber_id: data[2],
        service_id: data[3],
        client_id: id,
        deleted: false,
      });
      return 'Your appointment created successfully';
    } catch (e) {
      LogError(e)
      console.log(e);
      return 'Sorry, something wrong, we are working width it';
    }
  }
}

