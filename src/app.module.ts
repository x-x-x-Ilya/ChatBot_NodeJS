// Node.js frame for building scalable server-side applications.
import { Module } from '@nestjs/common';
import { appController } from './appController';
import { ClientController} from './controller/ClientController';
import { AppointmentController} from './controller/AppointmentController';
import { ServiceController} from './controller/ServiceController';

// Root module, starting point that Nest uses to build the application graph
@Module({
  imports: [],
  controllers: [appController],
  providers: [ServiceController, AppointmentController, ClientController]
})

export class AppModule {}
