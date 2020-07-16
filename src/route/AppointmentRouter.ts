import { Injectable } from '@nestjs/common';
import { AppointmentController } from '../controller/AppointmentController';
const appointmentController = new AppointmentController();

@Injectable()
export class AppointmentRouter {

  async History(msg: any): Promise<string | boolean> {
    const history = await appointmentController.showMyHistory(msg.chat.id);
    if (history != false)
      return history;
    else
      return 'You have empty history';
  }

  async Booked(msg: any): Promise<boolean | string> {
    const booked_appointments = await appointmentController.showMyAppointments(msg.chat.id,);
    if (booked_appointments != false)
      return booked_appointments;
    else
      return 'You have no planned appointments';
  }

  async Free(date: any) : Promise<boolean | string>{
    const t = date.split('.'),
      Year = t[2],
      Month = parseInt(t[1]) - 1,
      day = parseInt(t[0]);
    const check_date = new Date(Year, Month, day);
    if (check_date > new Date())
      return await appointmentController.freeDateAppointment(check_date);
    else
      return 'Date should be in future';
  }

  async Set(user_id: any, msg: any): Promise<any> {
    return await appointmentController.Set(user_id, msg);
  }

  async ChangeBarber(user_id: any, msg: any) {
    return await appointmentController.ChangeBarber(user_id, msg);
  }

  async ChangeService(user_id, msg) {
    return await appointmentController.ChangeService(user_id, msg);
  }

  async ChangeDate(user_id, msg) {
    return await appointmentController.ChangeDate(user_id, msg);
  }
  async Delete(user_id, msg) {
    return await appointmentController.Delete(user_id, msg);
  }


}
  /*
  async Get(msg: any, id: number): Promise<any> {
    return await appointmentController.GetAppointment(msg.chat.id, id);
  }

  async Remove(
    TelegramBot: any,
    msg: any,
    appointment: any,
  ): Promise<any> {
    return await appointmentController.deleteAppointment(
      msg.chat.id,
      appointment,
    );
  }
}*/