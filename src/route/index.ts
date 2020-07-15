import { AppointmentRouter } from './AppointmentRouter';
import { BarberRouter } from './BarberRouter';
import { ClientRouter } from './ClientRouter';
import { ServiceRouter } from './ServiceRouter';

export const appointment = new AppointmentRouter();
export const barber = new BarberRouter();
export const client = new ClientRouter();
export const service = new ServiceRouter();

export const routes = {appointment, barber, client, service};