import { clients } from '../database/models/clients';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('../database/sequelize');
export class ClientRepository {

  async SetEmail(email: string, id: number): Promise<string> {
    const t = await Sequelize.transaction();
    try {
      const client = await clients.findOne({
        where: { id: id },
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

  async SetLastName(last_name: string, id: number): Promise<string> {
    const t = await Sequelize.transaction();
    try {
      const client = await clients.findOne({
        where: { id: id },
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

  async Profile(id: number): Promise<any> {
    return clients.findOne({
      where: {
        id: id,
      }
    });
  }

  async AddClient(id: number, first_name: string, last_name: string,): Promise<any> {
    const client = await clients.findOne({
      where: { id: id },
    });
    if (client == null)
      return clients.create({
        id: id,
        first_name: first_name,
        last_name: last_name,
        deleted: false,
      });
  }
}
