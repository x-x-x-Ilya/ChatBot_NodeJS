import { Module } from '@nestjs/common';
import { BarberController } from './app.controller';
import { BarberService } from './app.service';

@Module({
  imports: [],
  controllers: [BarberController],
  providers: [BarberService],
})
export class AppModule {}