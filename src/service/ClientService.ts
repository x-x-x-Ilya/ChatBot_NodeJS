import { ClientRepository } from '../repositories/ClientRepository';
const clientRepository = new ClientRepository();

export class ClientService {

  async setEmail(email: string, id: number): Promise<any> {
    return await clientRepository.setEmail(email, id);
  }

  async profile(id: number): Promise<any> {
    return await clientRepository.profile(id);
  }

  async setLastName(last_name: string, id: number): Promise<any> {
    return await clientRepository.setLastName(last_name, id);
  }

  async addClient(id: number,
                  first_name: string,
                  last_name: string): Promise<any> {
    return await clientRepository.addClient(id, first_name, last_name);
  }
}
