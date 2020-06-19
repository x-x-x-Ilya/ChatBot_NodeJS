import {ClientService} from '../service/ClientService';
const clientService = new ClientService();

export class ClientController {

  enterEmail(): string {
    return clientService.enterEmail();
  }

}
