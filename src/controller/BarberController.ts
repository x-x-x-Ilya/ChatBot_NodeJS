import {BarberService} from '../service/BarberService';
const barberService = new BarberService();

export class BarberController {

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
   async showBarberList() {
    const barbers = await barberService.showBarberList();
     if(barbers.length != 0) {
       let Response = '\r\n';
       for (let i = 0; i < barbers.length; i++) {
         Response += "[" + barbers[i].id + "] " + barbers[i].first_name + ' ';
         Response += barbers[i].last_name + '\r\n';
       }
       return Response;
     }
     return false;
  }

  async selectBarber(id){
    return await barberService.selectBarber(id);
  }



}
