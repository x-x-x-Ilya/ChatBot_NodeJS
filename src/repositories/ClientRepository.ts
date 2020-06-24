import {clients} from '../database/models/clients';

export class ClientRepository {

  async enterEmail(email, id, first_name, last_name) {
    try {
      if(!last_name) last_name = "";

      const client = await clients.findOne({
        where: { id: id }
      });
      if (client != null) {
        await client.update({
          email: email,
        });
        return 'your email updated';
      } else {
        const client = await clients.create({
          email: email,
          id: id,
          first_name: first_name,
          last_name: last_name,
          deleted: false
        });
        console.log(client)
        return client;
      }
      } catch (e) {
      console.log(e);
    }
  }

  async addClient(id, first_name, last_name){
    const client = await clients.findOne({
      where:{id:id}
    });
    if(client == null)
    return clients.create({
      id: id,
      first_name: first_name,
      last_name: last_name,
      deleted: false
    });
  }

}