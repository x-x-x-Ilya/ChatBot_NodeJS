import { ClientController } from './ClientController';
import { ServiceController } from './ServiceController';
import { AppointmentController } from './AppointmentController';

const client = new ClientController();
const service = new ServiceController();
const appointment = new AppointmentController();

// For simple controllers export
export const controller = {client, service, appointment};