import { ClientRepository } from '../repositories/ClientRepository';
const clientRepository = new ClientRepository();

export class ClientService {

  async enterEmail(email: string, id: number): Promise<any> {
    return await clientRepository.enterEmail(email, id);
  }

  async MyProfile(id: number): Promise<any> {
    return await clientRepository.MyProfile(id);
  }

  async enterLastName(last_name: string, id: number): Promise<any> {
    return await clientRepository.enterLastName(last_name, id);
  }

  async addClient(id: number, first_name: string, last_name: string,): Promise<any> {
    return await clientRepository.addClient(id, first_name, last_name);
  }
}
