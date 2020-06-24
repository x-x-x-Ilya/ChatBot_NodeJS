import {ClientService} from '../service/ClientService';
const clientService = new ClientService();

export class ClientController {

  enterEmail(email, id, first_name, last_name) {
    email = email.substring(7, email.length);
    return clientService.enterEmail(email, id, first_name, last_name);
  }
  async MyProfile(id){
    return await clientService.MyProfile(id);
  }

  addClient(id, first_name, last_name){
    return clientService.addClient(id, first_name, last_name);
  }
}
