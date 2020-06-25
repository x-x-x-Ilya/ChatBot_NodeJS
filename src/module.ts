import {AppointmentController } from './controller/AppointmentController';
import {BarberController } from './controller/BarberController';
import {ClientController } from './controller/ClientController';
import {ServiceController } from './controller/ServiceController';

import {AppointmentService } from './service/AppointmentService';
import {BarberService } from './service/BarberService';
import {ClientService } from './service/ClientService';
import {ServiceService } from './service/ServiceService';

import {AppointmentRepository } from './repositories/AppointmentRepository';
import {BarberRepository} from './repositories/BarberRepository';
import {ClientRepository } from './repositories/ClientRepository';
import {ServiceRepository } from './repositories/ServiceRepository';

const appointmentController = new AppointmentController();
const barberController = new BarberController();
const clientController = new ClientController();
const serviceController = new ServiceController();

const appointmentService = new AppointmentService();
const barberService = new BarberService();
const clientService = new ClientService();
const serviceService = new ServiceService();

const appointmentRepository = new AppointmentRepository();
const barberRepository = new BarberRepository();
const clientRepository = new ClientRepository();
const serviceRepository = new ServiceRepository();

export const controllers = {appointmentController, barberController, clientController, serviceController};
export const services = {appointmentService, barberService, clientService, serviceService};
export const repository = {appointmentRepository, barberRepository, clientRepository, serviceRepository};