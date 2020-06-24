import { Op } from 'sequelize';
import {appointments} from '../database/models/appointments';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('sequelize-values')();
export class AppointmentRepository {

  setAppointment() {
    return appointments.create({
      /*date:
      begin:
      end:
      include: [
        {
          model: Service,
          attributes: ['name'],
          as: 'services',
        }*/
    });
  }
  
  showMyAppointments(id) {  // или добавить условие поиска или убрать лишнее в сервисах
    return appointments.findAll({
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
        Response += Sequelize.getValues(allAppointments[i]) + ' ';
        //}
      }
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

  // перенести формирование вывода на другой уровень
  async checkDateAppointment(check_date: Date) : Promise<string>{
    const nextDay = new Date(check_date.getTime());
    nextDay.setDate(nextDay.getDate() + 1);

    return await appointments.findAll({
      where:{
        date: {
         [Op.between]: [Date.parse(check_date.toString() + " GMT") / 1000, Date.parse(nextDay.toString()+ " GMT") / 1000]
        },
        deleted: false
      },
      raw: true
    }).then(function (appointments : Array<any>) {
        let found_in_sec = [];
        for (let i = 0; i < appointments.length; i++) {
          found_in_sec.push(new Date(Sequelize.getValues(appointments[i].date * 1000)).getHours() * 3600+
            new Date(Sequelize.getValues(appointments[i].date * 1000)).getMinutes() * 60);
      }
      found_in_sec = found_in_sec.sort();
        let zero;
        let R = "We are have no work:\r\n";
        if(found_in_sec[0] != 36000)
          R += "from 10:00 to " + found_in_sec[0]/3600 + ":" +(found_in_sec[0]%3600)/60 + "\r\n";
          for(let i = 0; i < found_in_sec.length - 1; i++){
            if(((found_in_sec[i + 1] + 3600)%3600)/60 == 0) zero = "0";
            else zero = "";
          R += "from " + (found_in_sec[i] + 3600)/3600 + ":" + ((found_in_sec[i] + 3600)%3600)/60 + " to " + found_in_sec[i + 1]/3600 + ":" + (found_in_sec[i + 1]%3600)/60 + zero+ "\r\n";
        }
      if(found_in_sec[found_in_sec.length - 1] != 79200) {
        R += "from " + found_in_sec[found_in_sec.length - 1]/3600 + ":" + (found_in_sec[found_in_sec.length - 1]%3600)/60 + " to 22:00\r\n";
      }
        /*let start = 36000;
        let response = "We can work ";
      for(let i = 0; i < today_appointmetns_in_seconds.length; i++) {
        if (today_appointmetns_in_seconds[0] >=  start + 3600){
          //response += "from " + start/3600 + ":" + start/60 + " to " + today_appointmetns_in_seconds[0]/3600 + ":" + today_appointmetns_in_seconds[0]/60;
        }
          }*/

      found_in_sec.sort((a: number, b:number) => {
            if(a > b)
              return b;
            else
              return a;
          });
        return R;
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  deleteAppointment(should_be_appointment_id){
    const appointment = appointments.findOne({where:{id:should_be_appointment_id}});
    return appointment.update({
      deleted: true
    });
  }

}