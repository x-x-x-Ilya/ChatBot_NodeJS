import {AppointmentRouter } from './AppointmentRouter';
import {BarberRouter } from './BarberRouter';
import {ClientRouter } from './ClientRouter';
import {ServiceRouter } from './ServiceRouter';

const appointmentRouter = new AppointmentRouter();
const barberRouter = new BarberRouter();
const clientRouter = new ClientRouter();
const serviceRouter = new ServiceRouter();

export const routes = {appointmentRouter, barberRouter, clientRouter, serviceRouter};