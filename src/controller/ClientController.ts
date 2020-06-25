import {ClientService} from '../service/ClientService';
const clientService = new ClientService();

export class ClientController {

  async enterEmail(email, id) {
    return await clientService.enterEmail(email, id);
  }
  async MyProfile(id){
    return await clientService.MyProfile(id);
  }

  async enterLastName(last_name, id){
    return await clientService.enterLastName(last_name, id);
  }



  async addClient(id, first_name, last_name){
    return await clientService.addClient(id, first_name, last_name);
  }
}
