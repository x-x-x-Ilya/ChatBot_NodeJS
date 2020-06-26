import { Op } from 'sequelize';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const appointments = require('../database/models/appointments');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const barbers = require('../database/models/barbers') ;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('sequelize-values')();


export class AppointmentRepository {

  async showMyAppointments(id) {  // или добавить условие поиска или убрать лишнее в сервисах
    return await appointments.findAll({
      where: {
        client_id: id,
        deleted: false
      },
      raw: true,
      attributes: ['date', 'id'],
      include: [
        {
          model: barbers,
          attributes: ['first_name', 'last_name'],
        }/*, {
          model: services,
          attributes: ['name'],
          as: 'services'
        }*/]
    });
  }


  async showMyHistory(id) {
    return await appointments.findAll(
      {
        where: {
          client_id: id,
          deleted: false
        },
        //attributes: ['date'], // include barber && service
        raw: true
      });
  }


  async checkDateAppointment(check_date: Date) {
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


  async deleteAppointment(should_be_appointment_id){
    const appointment = await appointments.findOne({where:{id:should_be_appointment_id}});
    return await appointment.update({
      deleted: true
    });
  }


  async setAppointment(date, id){
    const appointment =  await appointments.create({
      date: date,
      client_id: id,
      deleted: false
    })
    if(appointment)
      return true;
    else
      return false;

  }
}