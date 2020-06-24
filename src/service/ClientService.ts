import {ClientRepository} from '../repositories/ClientRepository';
const clientRepository = new ClientRepository();

export class ClientService {

    enterEmail(email, id, first_name, last_name) {
    return  clientRepository.enterEmail(email, id, first_name, last_name);
  }

  addClient(id, first_name, last_name){
    return  clientRepository.addClient(id, first_name, last_name);

  }
}
