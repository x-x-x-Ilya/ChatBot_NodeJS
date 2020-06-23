import {ClientRepository} from '../repositories/ClientRepository';
const clientRepository = new ClientRepository();

export class ClientService {

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    enterEmail(email, id, first_name, last_name) {
    return  clientRepository.enterEmail(email, id, first_name, last_name);
  }

  addClient(id, first_name, last_name){
    return  clientRepository.addClient(id, first_name, last_name);

  }
}
