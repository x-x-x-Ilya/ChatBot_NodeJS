export function isCommand(
  text: string,
  command: string,
  id: number): boolean {

  if (text.indexOf(command) === -1)
    return false;
  else
    return true;
}
