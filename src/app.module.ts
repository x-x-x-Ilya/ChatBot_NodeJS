import { Module } from '@nestjs/common';
import { appController } from './appController';
import { AppointmentRouter} from './route/AppointmentRouter';
import { BarberRouter} from './route/BarberRouter';
import { ClientRouter} from './route/ClientRouter';
import { ServiceRouter } from './route/ServiceRouter';

@Module({
  imports: [],
  controllers: [appController],
  providers: [AppointmentRouter, BarberRouter, ClientRouter, ServiceRouter],
})
export class AppModule {}
