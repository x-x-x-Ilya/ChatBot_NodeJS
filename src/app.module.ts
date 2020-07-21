import { Module } from '@nestjs/common';  // Node.js framework for building efficient and scalable server-side applications.
import { appController } from './appController';

import { ClientController} from './controller/ClientController';
import { AppointmentController} from './controller/AppointmentController';
import { ServiceController} from './controller/ServiceController';
import { BarberController} from './controller/BarberController';

// Root module, the starting point that Nest uses to build the application graph
@Module({
  imports: [],
  controllers: [appController],
  providers: [BarberController, ServiceController, AppointmentController, ClientController]
})

export class AppModule {}
