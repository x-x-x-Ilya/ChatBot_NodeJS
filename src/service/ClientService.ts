import {ClientRepository} from '../repositories/ClientRepository';
const clientRepository = new ClientRepository();

export class ClientService {

    async enterEmail(email, id) {
      return  await clientRepository.enterEmail(email, id);
    }

    async MyProfile(id){
      let Response = "";
      const client = await clientRepository.MyProfile(id);
      if(client.last_name == null) client.last_name = 'not indicated';
      if(client.email == null) client.email = 'not indicated';
      Response += "First name: " + client.first_name + "\r\nLast name: " + client.last_name + "\r\nEmail: " + client.email;
      return Response;
    }

  async enterLastName(last_name, id) {
    return await clientRepository.enterLastName(last_name, id);
  }

  async addClient(id, first_name, last_name) {
    return  await clientRepository.addClient(id, first_name, last_name);

  }
}
