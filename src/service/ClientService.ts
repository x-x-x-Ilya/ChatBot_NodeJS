import {ClientRepository} from '../repositories/ClientRepository';
const clientRepository = new ClientRepository();

export class ClientService {

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    enterEmail(email, id, first_name) {
    return  clientRepository.enterEmail(email, id, first_name);
  }

  addClient(id, first_name){
    return  clientRepository.addClient(id, first_name);

  }
}
