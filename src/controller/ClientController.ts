import {ClientService} from '../service/ClientService';
const clientService = new ClientService();

export class ClientController {

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  enterEmail(email, id, first_name, last_name) {
    email = email.substring(7, email.length);
    return clientService.enterEmail(email, id, first_name, last_name);
  }
  addClient(id, first_name, last_name){
    return clientService.addClient(id, first_name, last_name);
  }
}
