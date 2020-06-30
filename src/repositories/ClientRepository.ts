import {clients} from '../database/models/clients';

export class ClientRepository {

  async enterEmail(email : string, id : number) : Promise<string>{
      const client = await clients.findOne({
        where: { id: id }
      });
        await client.update({
          email: email,
        });
        return 'Your email updated';
  }

  async enterLastName(last_name : string, id : number) : Promise<string>{
    const client = await clients.findOne({
      where: { id: id }
    });
    await client.update({
      last_name: last_name,
    });
    return 'Your last_name updated';
  }

  async MyProfile(id : number) : Promise<any>{
    return await clients.findOne({
      where: {
        id: id
      },
      raw: true
    });
  }

  async addClient(id : number, first_name : string, last_name : string) : Promise<any> {
    const client = await clients.findOne({
      where: { id: id }
    });
    if (client == null)
      return clients.create({
        id: id,
        first_name: first_name,
        last_name: last_name,
        deleted: false
      });
  }
}