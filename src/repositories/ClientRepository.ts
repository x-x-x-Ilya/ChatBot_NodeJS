import { clients } from '../database/models/clients';

export class ClientRepository {

  async set(client: string | any,
            update: {email: string} | {last_name: string}): Promise<any> {
      return await client.update(update,
        {
          returning: true,
          plain: true
        });
  }

  async setEmail(client:  string | any,
                 email: string): Promise<boolean> {
    const update = { email: email };
    const result = await this.set(client, update);
    if(result === false) return false;
    return result.dataValues.email === email;
  };

  async setLastName(client: string | any,
                    last_name: string): Promise<boolean> {
    const update = { last_name: last_name };
    const result = await this.set(client, update);
    if(result === false) return false;
    return result.dataValues.last_name === last_name;
  }


  async profile(id: number): Promise<any> {
      return clients.findOne({ where: { id: id } });
  }

  async addClient(id: number, first_name: string,
                  last_name: string | undefined | null): Promise<any> {
       return  clients.create({
        id: id,
        first_name: first_name,
        last_name: last_name,
        deleted: false,
      });
  }

}