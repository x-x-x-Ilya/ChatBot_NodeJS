import {ClientRepository} from '../repositories/ClientRepository';
const clientRepository = new ClientRepository();

export class ClientService {

    async enterEmail(email, id) {
      return  await clientRepository.enterEmail(email, id);
    }

    async MyProfile(id){
      return await clientRepository.MyProfile(id);
    }

  async enterLastName(last_name, id) {
    return await clientRepository.enterLastName(last_name, id);
  }

  async addClient(id, first_name, last_name) {
    return  await clientRepository.addClient(id, first_name, last_name);

  }
}
