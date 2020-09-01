/**
 *  Format:
 *  command
 *  description
 */

export const bedit = '/bedit';
export const onBedit = '\n/bedit AppointmentID barberID (change barber) for example: “/bedit 1 1”\n';

export const del ='/delete';
export const onDelete = '\n/delete AppointmentID (delete appointment) for example: “/delete 1”';

export const dedit = '/dedit';
export const onDedit = '\n/dedit AppointmentID dd.mm.yyyy hh:mm (change date && time) for example: “/dedit 1 01.01.2022 15:00”\n'

export const sedit = '/sedit';
export const onSedit = '\n/sedit AppointmentID serviceID (change service) for example: “/sedit 1 1”\n';

export const sign = '/sign';
export const onSign = '\n/sign dd.mm.yyyy hh:mm barberID serviceID (set’s your new appointment) for example: “/sign 01.01.2001 15:00 4 5”\n';

export const check ='/check';
export const onCheck = '\n/check 00.00.0000 (check’s free time this date) for example: “/check 01.01.2022”\n';

export const m = '/m';
export const onM = '\n/m new email (set\'s your email) for example: “/m examplemail@gmail.com”\n';

export const l = '/l';
export const onL = '\n/l new last name (set\'s your last name) for example: “/l Putin”\n';

export const onHelp =
  'My commands:\n' +
  '/l new last name (set\'s your last name) for example: “/l Putin”\n' +
  '/m new email (set\'s your email) for example: “/m examplemail@gmail.com”\n' +
  '/help output all commands for example: “/help”\n' +
  '/check 00.00.0000 (check’s free time this date) for example: “/check 01.01.2022”\n' +
  '/sign dd.mm.yyyy hh:mm barberID serviceID (set’s your new appointment) for example: “/sign 01.01.2001 15:00 4 5”\n' +
  '/dedit AppointmentID dd.mm.yyyy hh:mm (change date && time) for example: “/dedit 1 01.01.2022 15:00”\n' +
  '/bedit AppointmentID barberID (change barber) for example: “/bedit 1 1”\n' +
  '/sedit AppointmentID serviceID (change service) for example: “/sedit 1 1”\n' +
  '/delete AppointmentID (delete appointment) for example: “/delete 1”';