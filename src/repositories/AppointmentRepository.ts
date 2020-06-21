// eslint-disable-next-line @typescript-eslint/no-var-requires
const Appointment = require('../database/models/appointments');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Service = require('../database/models/services');
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
        //, date > cur_date
      }
    });
  }

  showMyHistory(id) {
    return Appointment.findAll( // или добавить условие поиска или убрать лишнее в сервисах
      {
        where:{
          client_id: id,
          deleted: false
          //, date < cur_date
        }
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