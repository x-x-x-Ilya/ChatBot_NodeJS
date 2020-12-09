import { AppointmentRepository } from '../repositories/AppointmentRepository';
import { ClientService } from './ClientService';
import { mailer } from '../middleware/nodemailer';
import { Op } from 'sequelize';
import { Appointment } from './BotResponse';

const repository = new AppointmentRepository();

export class AppointmentService {
    async booked(id: number): Promise<string> {
        const option = {
            client_id: id,
            deleted: false,
            date: { [Op.gte]: new Date() },
        };

        const appointments = await repository.getAll(option);

        let response = '\r\n';
        for (let i = 0; i < appointments.length; i++) {
            response +=
                '[' +
                appointments[i].id +
                '] ' +
                appointments[i].date +
                ' ' +
                appointments[i].service.name +
                ' ' +
                appointments[i].barber.first_name +
                ' ' +
                appointments[i].barber.last_name +
                '\r\n';
        }
        return response;
    }

    async history(id: number): Promise<string> {
        const option = {
            client_id: id,
            deleted: false,
            date: { [Op.lte]: new Date() },
        };

        const allAppointments = await repository.getAll(option);

        let Response = '\r\n';
        for (let i = 0; i < allAppointments.length; i++) {
            Response +=
                '[' +
                allAppointments[i].id +
                '] ' +
                allAppointments[i].date +
                '\r\n';
        }
        return Response;
    }

    async set(id: number, text: string): Promise<any> {
        const data = text.split(' ');
        const date = new Date(data[0]);
        const time = data[1].split(':');
        date.setHours(parseInt(time[0]));
        date.setMinutes(parseInt(time[1]));

        const date_before = new Date(date.getTime() - 3600000);
        const date_after = new Date(date.getTime() + 3600000);
        const options = { date: { [Op.between]: [date_before, date_after] } };

        const appointments = await repository.getAll(options);

        if (appointments.length === 0) {
            await repository.set(
                id,
                date,
                parseInt(data[2]),
                parseInt(data[3]),
            );
            return Appointment.created;
        } else {
            return Appointment.busy;
        }
    }

    async free(date: Date): Promise<string> {
        if (date < new Date()) return Appointment.not_future;

        const nextDay = new Date(date.getTime());

        nextDay.setDate(nextDay.getDate() + 1);

        const option = {
            deleted: false,
            date: { [Op.between]: [date, nextDay] },
        };

        const appointment = await repository.getAll(option);

        if (appointment.length === 0) return Appointment.free;
        let response = 'Appointments that day:\n';

        let _: string, __: string;
        for (let i = 0; i < appointment.length; i++) {
            _ = '';
            __ = '';

            if (appointment[i].date.getMinutes().toString().length === 1)
                _ = '0';

            if (appointment[i].date.getHours().toString().length === 1)
                __ = '0';

            response +=
                __ +
                appointment[i].date.getHours() +
                ':' +
                _ +
                appointment[i].date.getMinutes() +
                '\n';
        }
        return response;
    }

    async findOne(id: number, appointment_id: number): Promise<any> {
        const options = {
            deleted: false,
            client_id: id,
            id: appointment_id,
        };

        return repository.findOne(options);
    }

    async change(id: number, text: string, update_field: string): Promise<any> {
        const user: any = ClientService.prototype.profile(id);
        const data = text.split(' ');
        const appointment = await this.findOne(id, parseInt(data[0]));

        let update_id = parseInt(data[1]);
        if (update_id == undefined) update_id = 1;

        let update;
        if (update_field === 'barber_id') update = { barber_id: update_id };
        else if (update_field === 'service_id')
            update = { service_id: update_id };
        else if (update_field === 'deleted') update = { deleted: true };

        await repository.update(appointment, update);

        mailer(user.email, 'Your appointment updated successfully');

        return Appointment.success;
    }

    async changeDate(id: number, text: string): Promise<any> {
        const user: any = ClientService.prototype.profile(id);
        const data = text.split(' ');
        const appointment = await this.findOne(id, parseInt(data[0]));

        if (data[1] == undefined) data[1] = appointment.date;

        const date = new Date(data[1]);

        if (data[2] != undefined) {
            const time = data[2].split(':');
            date.setHours(parseInt(time[0]));
            date.setMinutes(parseInt(time[1]));
        }

        await repository.changeDate(appointment, date);

        mailer(user.email, 'Your visit date replaced successfully');

        return Appointment.replaced;
    }
}
