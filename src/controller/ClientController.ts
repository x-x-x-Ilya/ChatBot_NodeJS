import { ClientService } from '../service/ClientService';
import { Message } from '../middleware/TelegramClasses';
const clientService = new ClientService();

export class ClientController {

  async SetEmail(text: string, id: number): Promise<any> {
    return await clientService.enterEmail(text, id);
  }

  async MyProfile(msg: Message): Promise<string> {
    const client = await clientService.MyProfile(msg.chat.id);
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
    return await clientService.enterLastName(last_name, id);
  }

  async addClient(msg: Message): Promise<any> {
    return await clientService.addClient(msg.chat.id, msg.chat.first_name, msg.chat.last_name);
  }
}
