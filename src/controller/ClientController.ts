import { ClientService } from '../service/ClientService';
import { Message } from '../middleware/TelegramClasses';
const clientService = new ClientService();

export class ClientController {

  async setEmail(cmd: string, id: number): Promise<string> {
    const email = cmd.substring(3)
    return await clientService.setEmail(email, id);
  }

  async profile(msg: Message): Promise<string> {
    return await clientService.profile(msg.chat.id);
  }

  async setLastName(cmd: string, id: number): Promise<string> {
    const last_name = cmd.substring(3);
    return await clientService.setLastName(last_name, id);
  }

  async addClient(id: number, first_name: string,
                  last_name: string | undefined | null ): Promise<void> {
    return await clientService.addClient(id, first_name, last_name);
  }
}
