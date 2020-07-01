import {clients} from '../database/models/clients';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('../database/sequelize');
export class ClientRepository {

  async enterEmail(email : string, id : number) : Promise<string>{
    const t = await Sequelize.transaction();
    try{
    const client = await clients.findOne({
        where: { id: id }
      });
        await client.update({
          email: email,
        });
      await t.commit();
      return 'Your email updated';
    } catch (e) {
      await t.rollback();
      return 'Sorry. something wrong, please, try again later...';
    }
  }

  async enterLastName(last_name : string, id : number) : Promise<string> {
    const t = await Sequelize.transaction();
    try {
      const client = await clients.findOne({
        where: { id: id }
      });
      await client.update({
        last_name: last_name,
      });
      await t.commit();
      return 'Your last_name updated';
    } catch (e) {
      await t.rollback();
      return 'Sorry. something wrong, please, try again later...';
    }
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