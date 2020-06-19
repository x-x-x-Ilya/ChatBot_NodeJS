// eslint-disable-next-line @typescript-eslint/no-var-requires
const Client = require('../database/models/clients');

export class ClientRepository {


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async enterEmail(email, id, first_name) {
    try {
      /*const client = Client.findOne({
        where: { id: id }
      });
      if (client != null) {
        await client.update({
          email: email,
          id: id,
          first_name: first_name,
          last_name: "last_name deaf",
          deleted: false
        });
        return 'updated';
      } else {*/
      const client = await Client.create({
          email: email,
          id: id,
          first_name: first_name,
          deleted: false
        });
        console.log(client)
        return client;
      } catch (e) {
      console.log(e);
    }
  }
}