import { Send } from './sendMessage';
import { menu } from '../keyboards/keyboards';

export async function isCommand(text: string, command: string, id: number): Promise<boolean> {
  const message = text.trim();
  if(message === command) {
    Send(id, 'Command should have params', menu);
    return false;
  }
  else if(message.indexOf(command) != 0) {
    Send(id, 'Command should be at the beginning of message', menu);
    return false;
  }else if(message[message.indexOf(String(command.length))+1] != ' ') {
    Send(id, 'Incorrect command check it', menu)
    return false;
  }
  return true;
}