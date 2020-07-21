import { ClientRepository } from '../repositories/ClientRepository';
const clientRepository = new ClientRepository();

export class ClientService {

  async SetEmail(email: string, id: number): Promise<any> {
    return await clientRepository.enterEmail(email, id);
  }

  async Profile(id: number): Promise<any> {
    return await clientRepository.MyProfile(id);
  }

  async SetLastName(last_name: string, id: number): Promise<any> {
    return await clientRepository.enterLastName(last_name, id);
  }

  async addClient(id: number, first_name: string, last_name: string,): Promise<any> {
    return await clientRepository.addClient(id, first_name, last_name);
  }
}
