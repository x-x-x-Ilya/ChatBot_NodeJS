import {ClientRepository} from '../repositories/ClientRepository';
const clientRepository = new ClientRepository();

export class ClientService {

  enterEmail(): string {
    return 'service message';
  }

}
