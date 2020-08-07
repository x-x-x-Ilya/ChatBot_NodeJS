import { ClientRepository } from '../repositories/ClientRepository';
import { updateClientEmail, updateClientLastName, writeClientData }
from '../database/firebase';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('../database/sequelize');

const clientRepository = new ClientRepository();

export class ClientService {

  async setEmail(email: string, id: number): Promise<string> {
    const t = await Sequelize.transaction();
    try {
      const client = await clientRepository.profile(id);
      if(await clientRepository.setEmail(client, email)) {
        updateClientEmail(id, email);
        await t.commit();
        return 'Your email updated';
      } else
        return 'Somethings wrong, we are working to solve it';
    } catch (e) {
      await t.rollback();
      return 'Somethings wrong, we are working to solve it';
    }
  }

  async profile(id: number): Promise<string> {

    const client = await clientRepository.profile(id);
    if (client != false) {
      let add_mess = "";
      if (client.last_name == null) {
        client.last_name = 'not indicated';
        add_mess += '\r\nUse /l to send last name.';
      }
      if (client.email == null) {
        client.email = 'not indicated';
        add_mess += '\r\nUse /m to send email.';
      }

      return 'First name: ' + client.first_name +
        '\r\nLast name: ' + client.last_name +
        '\r\nEmail: ' + client.email + add_mess;
    } else
      return 'Somethings wrong, we are working to solve it';
  }

  async setLastName(last_name: string, id: number): Promise<string> {
    const t = await Sequelize.transaction();
    try {
      const client = await clientRepository.profile(id);
      if (await clientRepository.setLastName(client, last_name)) {
        updateClientLastName(id, last_name);
        await t.commit();
        return 'Your last name updated';
      } else
        return 'Somethings wrong, we are working to solve it';
    } catch (e) {
      await t.rollback();
      return 'Somethings wrong, we are working to solve it';
    }
  }

  async addClient(id: number, first_name: string,
                  last_name: string | undefined | null): Promise<void> {
    writeClientData(id, first_name, null, last_name);
    const client = await clientRepository.profile(id);
    if (client == null)
       await clientRepository.addClient(id, first_name, last_name);
  }
}
