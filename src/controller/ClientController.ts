import {ClientService} from '../service/ClientService';
const clientService = new ClientService();

export class ClientController {

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async enterEmail(email, id, first_name) {
    return await clientService.enterEmail(email, id, first_name);
  }

}
