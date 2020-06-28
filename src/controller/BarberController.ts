import {BarberService} from '../service/BarberService';
const barberService = new BarberService();

export class BarberController {

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
   async showBarberList() : Promise<string>{
    return await barberService.showBarberList();
  }

  async selectBarber(id){
    return await barberService.selectBarber(id);
  }



}
