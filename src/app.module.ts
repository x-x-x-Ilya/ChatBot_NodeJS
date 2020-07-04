import { Module } from '@nestjs/common';
import { appController } from './appController';

@Module({
  imports: [],
  controllers: [appController],
  providers: [],
})
export class AppModule {}