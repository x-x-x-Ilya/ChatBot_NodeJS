// eslint-disable-next-line @typescript-eslint/no-var-requires
const Appointment = require('../database/models/appointments');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Service = require('../database/models/services');
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
        Response += Sequelize.getValues(allAppointments[i].date) + ' ';
        Response += Sequelize.getValues(allAppointments[i]._begin) + ' ';
        Response += Sequelize.getValues(allAppointments[i]._end) + '\r\n';
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
        attributes: ['date'], // include barber && service
        raw: true
      }).then(function(allAppointments) {
        let Response = '\r\n';
      //const curDate = new Date();
      for (let i = 0; i < allAppointments.length; i++) {
        //if(Sequelize.getValues(allAppointments[i].date) < curDate){ // не проходит проверка
        Response += Sequelize.getValues(allAppointments[i].date) + ' ';
        Response += Sequelize.getValues(allAppointments[i]._begin) + ' ';
        Response += Sequelize.getValues(allAppointments[i]._end) + '\r\n';
        //}
      }
      return Response;
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  deleteAppointment(should_be_appointment_id){
    const appointment = Appointment.findOne({where:{id:should_be_appointment_id}});
    return appointment.update({
      deleted: true
    });
  }


  checkDateAppointment(should_be_appointment_date){
    Appointment.findAll({where:{date:should_be_appointment_date}}).then((appointments) => {
      console.log(appointments.map(appointments => appointments.toJSON()));
      // нашли записи на этот день, надо посчитать свободные места
      return 'hello worlds';//appointments.map(appointments => appointments.toJSON());
    });
  }

}