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
  
  showMyAppointments() {
    return Appointment.findAll({where:{}});
  }

  showMyHistory() {
    return Appointment.findAll({where:{}});
  }

  deleteApointment(){
    const appointment = Appointment.findOne({where:{}});
    return appointment.destroy();
  }
}