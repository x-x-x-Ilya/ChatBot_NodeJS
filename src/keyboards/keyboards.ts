import { isMenu, isAppointment, isEdit } from './keyboard-buttons';

const menuKeyboard = [
  [isMenu.PriceList, isMenu.BarberList],
  [isMenu.SignUpForAnAppointment, isMenu.Help],
  [isMenu.Profile],
];

const profileKeyboard = [
  [isAppointment.History, isAppointment.Booked],
  [isMenu.Help, isMenu.Back],
];

const editKeyboard = [
  [isEdit.ChangeDate, isEdit.ChangeBarber],
  [isEdit.ChangeService, isEdit.ChangeTime],
  [isEdit.Delete, isMenu.Back],
];

function reply(arg: string[][]) {
 return  {
    reply_markup:
      JSON.stringify({
        resize_keyboard: true,
        keyboard: arg,
      }) }
}

export const menu = reply(menuKeyboard);
export const help = reply(menuKeyboard);
export const profile = reply(profileKeyboard);
export const edit = reply(editKeyboard);