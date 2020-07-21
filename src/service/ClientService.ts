import { ClientRepository } from '../repositories/ClientRepository';
const clientRepository = new ClientRepository();

export class ClientService {

  async SetEmail(email: string, id: number): Promise<any> {
    return await clientRepository.SetEmail(email, id);
  }

  async Profile(id: number): Promise<any> {
    return await clientRepository.Profile(id);
  }

  async SetLastName(last_name: string, id: number): Promise<any> {
    return await clientRepository.SetLastName(last_name, id);
  }

  async AddClient(id: number, first_name: string, last_name: string,): Promise<any> {
    return await clientRepository.AddClient(id, first_name, last_name);
  }
}
