import {ClientRepository} from '../repositories/ClientRepository';
const clientRepository = new ClientRepository();

export class ClientService {

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async enterEmail(email, id, first_name) {
    return await clientRepository.enterEmail(email, id, first_name);
  }

}
