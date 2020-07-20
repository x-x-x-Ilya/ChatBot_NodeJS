import { Module } from '@nestjs/common';  // Node.js framework for building efficient and scalable server-side applications.
import { appController } from './appController';

// Root module, the starting point that Nest uses to build the application graph
@Module({
  imports: [],
  controllers: [appController],
  providers: [],
})
export class AppModule {
}
