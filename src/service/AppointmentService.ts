// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('sequelize-values')();
import {AppointmentRepository} from '../repositories/AppointmentRepository';
const appointmentRepository = new AppointmentRepository();

export class AppointmentService {

  async showMyAppointments(id) {
    const allAppointments = await appointmentRepository.showMyAppointments(id);

    for (let i = 0; i < allAppointments.length; i++)
    console.log(allAppointments[i]);

    let Response = '\r\n';
    const curDate = new Date();
    for (let i = 0; i < allAppointments.length; i++) {
      if(Sequelize.getValues(allAppointments[i].date) > curDate) // не проходит проверка
        Response += Sequelize.getValues(allAppointments[i].date) + '\r\n';
    }
    return Response;
  }

  async showMyHistory(id) {
    const allAppointments = await appointmentRepository.showMyHistory(id);
    let Response = '\r\n';
    const curDate = new Date();
    for (let i = 0; i < allAppointments.length; i++) {
      if(Sequelize.getValues(allAppointments[i].date) < curDate) // не проходит проверка
      Response += Sequelize.getValues(allAppointments[i].date) + '\r\n';
    }
    return Response;
  }


  async setAppointment(date, id) {
    return await appointmentRepository.setAppointment(date, id);
  }

  async deleteAppointment(should_be_appointment_id): Promise<string> {
    return await appointmentRepository.deleteAppointment(should_be_appointment_id);
  }

  async checkDateAppointment(date): Promise<string> {

    const appointment = await appointmentRepository.checkDateAppointment(date);
    if(appointment.length == 0){
      return "We are free from 10:00 to 22:00";
    }
    let found_in_sec = [];
    for (let i = 0; i < appointment.length; i++) {
      found_in_sec.push(appointment[i].date.getHours() * 3600 + appointment[i].date.getMinutes() * 60);
    }
    found_in_sec = found_in_sec.sort();
    let R = "We are free:\r\n";
    if (found_in_sec[0] != 36000)
      R += "from 10:00 to " + found_in_sec[0] / 3600 + ":" + (found_in_sec[0] % 3600) / 60 + "\r\n";
    for (let i = 0; i < found_in_sec.length - 1; i++) {
      R += "from " + (found_in_sec[i] + 3600) / 3600 + ":" + ((found_in_sec[i] + 3600) % 3600) / 60 + " to " + found_in_sec[i + 1] / 3600 + ":" + (found_in_sec[i + 1] % 3600) / 60 + "\r\n";
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
  };
}