import { Injectable } from '@nestjs/common';
import { barbers } from './database/models/barbers';

@Injectable()
export class BarberService {
  getHello(): string {
    //console.log(request);
    return 'Hello World!';
  }

  async showBarberList(): Promise<Array<any>> {
    return barbers.findAll({
      attributes: ['first_name', 'last_name', 'id'],
      raw: true
    });
  }
}