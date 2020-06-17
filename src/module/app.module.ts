import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { client } from '../database/connect';
// импортируем сюда всё, что используется приложением.
@Module({
  imports: [client],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
