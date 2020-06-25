import {clients} from '../database/models/clients';

export class ClientRepository {

  async enterEmail(email, id) {
      const client = await clients.findOne({
        where: { id: id }
      });
        await client.update({
          email: email,
        });
        return 'Your email updated';
  }

  async enterLastName(last_name, id){
    const client = await clients.findOne({
      where: { id: id }
    });
    await client.update({
      last_name: last_name,
    });
    return 'Your last_name updated';
  }

  async MyProfile(id){
    return await clients.findOne({
      where: {
        id: id
      },
      raw: true
    });
  }

  async addClient(id, first_name, last_name) {
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