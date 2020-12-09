import { ClientRepository } from '../repositories/ClientRepository';
import {
    updateClientEmail,
    updateClientLastName,
    writeClientData,
} from '../database/firebase';
import { Client } from './BotResponse';
import Sequelize from '../database/sequelize/sequelize';

const repository = new ClientRepository();

export class ClientService {
    async setEmail(email: string, id: number): Promise<string> {
        const t = await Sequelize.transaction();
        try {
            const client = await repository.profile(id);
            if (await repository.setEmail(client, email)) {
                updateClientEmail(id, email);
                await t.commit();
                return Client.mail_update;
            } else return Client.wrong;
        } catch (e) {
            await t.rollback();
            return Client.wrong;
        }
    }

    async profile(id: number): Promise<string> {
        const client = await repository.profile(id);
        if (client != false) {
            let add_mess = '';
            if (client.last_name == null) {
                client.last_name = 'not indicated';
                add_mess += '\r\nUse /l to send last name.';
            }
            if (client.email == null) {
                client.email = 'not indicated';
                add_mess += '\r\nUse /m to send email.';
            }

            return (
                'First name: ' +
                client.first_name +
                '\r\nLast name: ' +
                client.last_name +
                '\r\nEmail: ' +
                client.email +
                add_mess
            );
        } else return Client.wrong;
    }

    async setLastName(last_name: string, id: number): Promise<string> {
        const t = await Sequelize.transaction();
        try {
            const client = await repository.profile(id);
            if (await repository.setLastName(client, last_name)) {
                updateClientLastName(id, last_name);
                await t.commit();
                return Client.last_name_update;
            } else return Client.wrong;
        } catch (e) {
            await t.rollback();
            return Client.wrong;
        }
    }

    async addClient(
        id: number,
        first_name: string,
        last_name: string | undefined | null,
    ): Promise<void> {
        if (last_name === undefined) last_name = null;
        writeClientData(id, first_name, null, last_name);
        const client = await repository.profile(id);
        if (client == null)
            await repository.addClient(id, first_name, last_name);
    }
}
