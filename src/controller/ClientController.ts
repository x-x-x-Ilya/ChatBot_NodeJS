import { TelegramMessage } from 'src/middleware/TelegramClasses';
import { ClientService } from '../service/ClientService';
const service = new ClientService();

export class ClientController {
    async setEmail(cmd: string, id: number): Promise<string> {
        return await service.setEmail(cmd.substring(3), id);
    }

    async profile(msg: TelegramMessage): Promise<string> {
        return await service.profile(msg.chat.id);
    }

    async setLastName(cmd: string, id: number): Promise<string> {
        return await service.setLastName(cmd.substring(3), id);
    }

    async addClient(
        id: number,
        first_name: string,
        last_name: string | undefined | null,
    ): Promise<void> {
        return await service.addClient(id, first_name, last_name);
    }
}
