import { Op } from 'sequelize';
import { services } from '../database/models/services';
import { barbers } from '../database/models/barbers';
import { appointments } from '../database/models/appointments';
import { log_error } from '../helpers/error-handler';

export class AppointmentRepository {

  async showMyAppointments(id: number): Promise<Array<any>> {
    return await appointments.findAll({
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

  async showMyHistory(id: number): Promise<Array<any>> {
    return await appointments.findAll({
      where: {
        client_id: id, deleted: false,
        date: { [Op.lte]: new Date(), },
      }
    });
  }

  async freeDateAppointment(check_date: Date): Promise<Array<any>> {
    const nextDay = new Date(check_date.getTime());
    nextDay.setDate(nextDay.getDate() + 1);
    return await appointments.findAll({
      where: {
        date: { [Op.between]: [check_date, nextDay] },
        deleted: false,
      },
    });
  }

  async ChangeBarber(id, msg: any): Promise<any>{
    const data = msg.split(' ');
    const appointment = await appointments.findOne({
      where: {
        deleted: false,
        client_id: id,
        id: data[0]
      }
    });
    if(data[1] = undefined)
      data[1] = 'default';
    await appointment.update({
      barber_id: data[1]
    });
    return 'Your appointment updated';
  }

  async ChangeService(id: any, msg: any): Promise<any>{
    const data = msg.split(' ');
    const appointment = await appointments.findOne({
      where: {
        deleted: false,
        client_id: id,
        id: data[0]
      }
    });
    if(data[1] = undefined)
      data[1] = 'default'
    await appointment.update({
      service_id: data[1]
    });
    return 'Your appointment updated';
  }

  async ChangeDate(id: any, msg: any): Promise<any>{
    const data = msg.split(' ');
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
    date.setHours(time[0]);
    date.setMinutes(time[1]);}

    await appointment.update({
      date: date
    });
    return 'Your appointment updated';
  }

  async Delete(user_id: any, msg: any){
    const appointment = await appointments.findOne({
      where: {
        deleted: false,
        client_id: user_id,
        id: msg
      }
    });
    appointment.update({
      deleted: true
    })
    return 'Deleted successfully';
  }

  async Set(id, msg: any): Promise<any> {
    const data = msg.split(' ');
    const date = new Date(data[0]);
    const time = data[1].split(':');
    date.setHours(time[0]);
    date.setMinutes(time[1]);
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
      log_error(e)
      console.log(e);
      return 'Sorry, something wrong, we are working width it';
    }
  }
}

 /*
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
 */
