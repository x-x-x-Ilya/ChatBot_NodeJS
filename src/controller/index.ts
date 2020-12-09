import { ClientController } from './ClientController';
import { ServiceController } from './ServiceController';
import { AppointmentController } from './AppointmentController';

const client = new ClientController();
const service = new ServiceController();
const appointment = new AppointmentController();

// for simple controllers export
export const c = { client, service, appointment };