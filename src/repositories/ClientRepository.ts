import { clients } from '../database/models/clients';
import { logError } from '../middleware/logging';

export class ClientRepository {

  async set(client: any,
            update: {email: string} | {last_name: string}): Promise<any> {
    try {
      return await client.update(
        update,
        {
          returning: true,
          plain: true
        });
    } catch (error) {
      logError(error);
      return false;
    }
  }

  async setEmail(client: any, email: string): Promise<boolean> {
    const update = { email: email };
    const result = await this.set(client, update);
    if(result === false) return false;
    return result.dataValues.email === email;
  };

  async setLastName(client: any, last_name: string): Promise<boolean> {
    const update = { last_name: last_name };
    const result = await this.set(client, update);
    if(result === false) return false;
    return result.dataValues.last_name === last_name;
  }


  async profile(id: number): Promise<any> {
    try {
      return clients.findOne({ where: { id: id } });
    } catch (e) {
      logError(e);
      return null;
    }
  }

  async addClient(id: number, first_name: string,
                  last_name: string | undefined | null): Promise<any> {
    try {
       return await clients.create({
        id: id,
        first_name: first_name,
        last_name: last_name,
        deleted: false,
      });
    } catch (e) {
      logError(e);
      return null;
    }
  }
}