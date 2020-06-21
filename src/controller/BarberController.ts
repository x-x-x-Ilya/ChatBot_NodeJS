import {BarberService} from '../service/BarberService';
const barberService = new BarberService();

export class BarberController {

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
   showBarberList() : Promise<string>{
    return  barberService.showBarberList();
  }

  selectBarber(){
    return  barberService.selectBarber();
  }



}
