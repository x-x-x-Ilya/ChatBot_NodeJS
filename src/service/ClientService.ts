import {ClientRepository} from '../repositories/ClientRepository';
const clientRepository = new ClientRepository();

export class ClientService {

    enterEmail(email, id, first_name, last_name) {
      return  clientRepository.enterEmail(email, id, first_name, last_name);
    }

    async MyProfile(id){
      let Response = "";
      const client = await clientRepository.MyProfile(id);
      Response += "name: " + client.first_name + ", last_name: " + client.last_name + ", email: " + client.email;
      return Response;
    }

  addClient(id, first_name, last_name){
    return  clientRepository.addClient(id, first_name, last_name);

  }
}
