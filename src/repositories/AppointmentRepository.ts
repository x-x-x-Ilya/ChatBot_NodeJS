// eslint-disable-next-line @typescript-eslint/no-var-requires
import { Runtime } from 'inspector';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Appointment = require('../database/models/appointments');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('sequelize-values')();
export class AppointmentRepository {

  setAppointment() {
    return Appointment.create({
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
    return Appointment.findAll({
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
    return await Appointment.findAll(
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

  async checkDateAppointment(check_date: Date) : Promise<string>{
      //console.log("check_date:" + check_date);
      return await Appointment.findAll({
      where:{
        date: check_date,
        deleted: false
      },
      raw: true
    }).then(function (appointments) {
      let today_appointmetns = [22, 10];
        console.log("\r\n");
        for (let i = 0; i < appointments.length; i++) {
          console.log("curHour: " + Sequelize.getValues(appointments[i].date.getHours()));
          today_appointmetns.push(Sequelize.getValues(appointments[i].date.getHours()));
      }
        console.log("before sort:\r\n");
        for (let i = 0; i < today_appointmetns.length; i++) {
          console.log(today_appointmetns + " ");
        }
        today_appointmetns = today_appointmetns.sort();
        console.log("\r\nafter sort:\r\n");
        for (let i = 0; i < today_appointmetns.length; i++) {
          console.log(today_appointmetns + " ");
        }

        today_appointmetns.sort((a: number, b:number) => {
          if(a > b)
          return b;
          else
            return a;
        })

        return "hello worlds";
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  deleteAppointment(should_be_appointment_id){
    const appointment = Appointment.findOne({where:{id:should_be_appointment_id}});
    return appointment.update({
      deleted: true
    });
  }

}