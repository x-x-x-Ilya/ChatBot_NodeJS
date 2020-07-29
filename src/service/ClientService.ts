import { ClientRepository } from '../repositories/ClientRepository';
import { updateClientEmail, updateClientLastName, writeClientData } from '../database/firebase';
const clientRepository = new ClientRepository();

export class ClientService {

  async setEmail(email: string, id: number): Promise<any> {
    updateClientEmail(id, email);
    return await clientRepository.setEmail(email, id);
  }

  async profile(id: number): Promise<any> {
    return await clientRepository.profile(id);
  }

  async setLastName(last_name: string, id: number): Promise<any> {
    updateClientLastName(id, last_name);
    return await clientRepository.setLastName(last_name, id);
  }

  async addClient(id: number,
                  first_name: string,
                  last_name: string): Promise<any> {
    writeClientData(id, first_name, null, last_name);
    return await clientRepository.addClient(id, first_name, last_name);
  }
}
