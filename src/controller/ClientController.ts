import {ClientService} from '../service/ClientService';
const clientService = new ClientService();

export class ClientController {

  async enterEmail(email : string, id : number) : Promise<any> {
    return await clientService.enterEmail(email, id);
  }
  async MyProfile(id : number) : Promise<string>{
    const client = await clientService.MyProfile(id);
    let Response = "";
    if(client.last_name == null) client.last_name = 'not indicated';
    if(client.email == null) client.email = 'not indicated';
    Response += "First name: " + client.first_name + "\r\nLast name: " + client.last_name + "\r\nEmail: " + client.email;
    return Response;
  }

  async enterLastName(last_name : string, id : number) : Promise<any>{
    return await clientService.enterLastName(last_name, id);
  }

  async addClient(id : number, first_name :string, last_name : any) : Promise<any>{
    return await clientService.addClient(id, first_name, last_name);
  }
}
