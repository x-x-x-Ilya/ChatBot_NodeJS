import { ClientService } from '../service/ClientService';
import { Message } from '../middleware/TelegramClasses';
const clientService = new ClientService();

export class ClientController {

  async SetEmail(text: string, id: number): Promise<any> {
    return await clientService.SetEmail(text, id);
  }

  async Profile(msg: Message): Promise<string> {
    const client = await clientService.Profile(msg.chat.id);
    let add_mess = "";
    if (client.last_name == null) {
      client.last_name = 'not indicated';
      add_mess += '\r\nUse /l to send last name.';
    }
    if (client.email == null) {
      client.email = 'not indicated';
      add_mess += '\r\nUse /m to send email.';
    }
    return 'First name: ' +
      client.first_name +
      '\r\nLast name: ' +
      client.last_name +
      '\r\nEmail: ' +
      client.email +
      add_mess;
  }

  async SetLastName(last_name: string, id: number): Promise<any> {
    return await clientService.SetLastName(last_name, id);
  }

  async AddClient(msg: Message): Promise<any> {
    return await clientService.AddClient(msg.chat.id, msg.chat.first_name, msg.chat.last_name);
  }
}
