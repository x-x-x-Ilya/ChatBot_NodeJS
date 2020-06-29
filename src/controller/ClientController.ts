import {ClientService} from '../service/ClientService';
const clientService = new ClientService();

export class ClientController {

  async enterEmail(email, id) {
    return await clientService.enterEmail(email, id);
  }
  async MyProfile(id){
    const client = await clientService.MyProfile(id);
    let Response = "";
    if(client.last_name == null) client.last_name = 'not indicated';
    if(client.email == null) client.email = 'not indicated';
    Response += "First name: " + client.first_name + "\r\nLast name: " + client.last_name + "\r\nEmail: " + client.email;
    return Response;
  }

  async enterLastName(last_name, id){
    return await clientService.enterLastName(last_name, id);
  }

  async addClient(id, first_name, last_name){
    return await clientService.addClient(id, first_name, last_name);
  }
}
