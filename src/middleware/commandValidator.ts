import { send } from './sendMessage';
import { menu } from '../keyboards/keyboards';

export async function isCommand(text: string, command: string, id: number): Promise<boolean> {
  const message = text.trim();
  if(message === command) {
    send(id, 'Command should have params', menu);
    return false;
  }
  else if(message.indexOf(command) != 0) {
    send(id, 'Command should be at the beginning of message', menu);
    return false;
  }else if(message[message.indexOf(String(command.length))+1] != ' ') {
    send(id, 'Incorrect command check it', menu)
    return false;
  }
  return true;
}