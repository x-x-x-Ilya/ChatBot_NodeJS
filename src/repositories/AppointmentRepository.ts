// eslint-disable-next-line @typescript-eslint/no-var-requires
const Appointment = require('../database/models/appointments');

export class AppointmentRepository {

  showPriceList() {
    return Appointment.findAll({});
  }

}