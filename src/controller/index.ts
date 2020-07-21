import { ClientController } from './ClientController';
import { BarberController } from './BarberController';
import { ServiceController } from './ServiceController';
import { AppointmentController } from './AppointmentController';

const client = new ClientController();
const barber = new BarberController();
const service = new ServiceController();
const appointment = new AppointmentController();

export const controller = {client, barber, service, appointment};