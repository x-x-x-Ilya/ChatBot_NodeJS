import { Op } from 'sequelize';
import {appointments} from '../database/models/appointments';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('sequelize-values')();
export class AppointmentRepository {

  async showMyAppointments(id) {  // или добавить условие поиска или убрать лишнее в сервисах
    return await appointments.findAll({
      where:{
        client_id: id,
        deleted: false
      },
      attributes: ['date'], // include barber && service
      raw: true
    }).then(function(allAppointments) {
      let Response = '\r\n';
      //const curDate = new Date();
      for (let i = 0; i < allAppointments.length; i++) {
        //if(Sequelize.getValues(allAppointments[i].date) > curDate){ // не проходит проверка
        Response += Sequelize.getValues(allAppointments[i].date) + ' ';
        //}
      }
      console.log("Response:" + Response);
      return Response;
  });
  }

  async showMyHistory(id): Promise<string> {
    return await appointments.findAll(
      { where: {
          client_id: id,
          deleted: false },
        //attributes: ['date'], // include barber && service
        raw: true
      }).then(function(allAppointments) {
        let Response = '\r\n';
      //const curDate = new Date();
      for (let i = 0; i < allAppointments.length; i++) {
        //if(Sequelize.getValues(allAppointments[i].date) < curDate){ // не проходит проверка
        console.log(Sequelize.getValues(allAppointments[i]));
        Response += Sequelize.getValues(allAppointments[i].date) + ' ';
        //}
      }
      return Response;
    });
  }

  async checkDateAppointment(check_date: Date) {

    const nextDay = new Date(check_date.getTime());
    nextDay.setDate(nextDay.getDate() + 1);

    const appointment = await appointments.findAll({
      where: {
        date: {
          [Op.between]: [check_date, nextDay]
        },
        deleted: false
      },
      raw: true
    });//.then(function (appointments : Array<any>) {

    let found_in_sec = [];
    for (let i = 0; i < appointment.length; i++) {
      found_in_sec.push(appointment[i].date.getHours() * 3600 + appointment[i].date.getMinutes() * 60);
    }
    //console.log("before: " + found_in_sec);
    found_in_sec = found_in_sec.sort();
    //console.log("after: " + found_in_sec);
    let zero;
    let R = "We are have no work:\r\n";
    if (found_in_sec[0] != 36000)
      R += "from 10:00 to " + found_in_sec[0] / 3600 + ":" + (found_in_sec[0] % 3600) / 60 + "\r\n";
    for (let i = 0; i < found_in_sec.length - 1; i++) {
      if (((found_in_sec[i + 1] + 3600) % 3600) / 60 == 0) zero = "0";
      else zero = "";
      R += "from " + (found_in_sec[i] + 3600) / 3600 + ":" + ((found_in_sec[i] + 3600) % 3600) / 60 + " to " + found_in_sec[i + 1] / 3600 + ":" + (found_in_sec[i + 1] % 3600) / 60 + zero + "\r\n";
    }
    if (found_in_sec[found_in_sec.length - 1] != 79200) {
      R += "from " + found_in_sec[found_in_sec.length - 1] / 3600 + ":" + (found_in_sec[found_in_sec.length - 1] % 3600) / 60 + " to 22:00\r\n";
    }
    return R;

      found_in_sec.sort((a: number, b:number) => {
            if(a > b)
              return b;
            else
              return a;
          });
        return R;
    };


  async deleteAppointment(should_be_appointment_id){
    const appointment = await appointments.findOne({where:{id:should_be_appointment_id}});
    return await appointment.update({
      deleted: true
    });
  }


  async setAppointment(date, time, id){
    const appointment =  await appointments.create({
      date: date,
      time:time,
      client_id:id,
      deleted:false
    })
    if(appointment)
      return true;
    else
      return false;

  }
}