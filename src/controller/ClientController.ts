import { ClientService } from '../service/ClientService';
import { Message } from '../middleware/TelegramClasses';
const clientService = new ClientService();

export class ClientController {

  async setEmail(cmd: string, id: number): Promise<any> {
    const email = cmd.substring(3)
    return await clientService.setEmail(email, id);
  }

  async profile(msg: Message): Promise<string> {
    const client = await clientService.profile(msg.chat.id);

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
       '\r\nEmail: ' + client.email +
       add_mess;
  }

  async setLastName(cmd: string, id: number): Promise<any> {
    const last_name = cmd.substring(3);
    return await clientService.setLastName(last_name, id);
  }

  async addClient(id: number,
                  first_name: string,
                  last_name: string ): Promise<any> {
    return await clientService.addClient(id, first_name, last_name);
  }
}
