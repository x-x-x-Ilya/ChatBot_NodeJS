// eslint-disable-next-line @typescript-eslint/no-var-requires
const Appointment = require('../database/models/appointment');

export class AppointmentRepository {

  showPriceList() {
    return Appointment.findAll({});
  }

}