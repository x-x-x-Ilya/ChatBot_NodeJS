import {
  menuButtons,
  profileButtons,
  appointmentButtons,
  editButtons,
} from './key-board-buttons';

const menuKeyboard = [
  [menuButtons.PriceList, menuButtons.BarberList],
  [menuButtons.SignUpForAnAppointment], //, menuButtons.checkDateAppointment],
  [menuButtons.MyProfile],
];

const backKeyboard = [[menuButtons.Back]];

const profileKeyboard = [
  [profileButtons.Appointments, menuButtons.Back],
];

const editKeyboard = [
  [editButtons.ChangeDate, editButtons.ChangeBarber],
  [editButtons.ChangeService, editButtons.ChangeTime],
  [editButtons.Delete, menuButtons.Back],
];

const back_with_edit_keyboard = [[menuButtons.Back], [appointmentButtons.Edit]];

function reply_markup(arg: string[][]) {
  return JSON.stringify({
    resize_keyboard: true,
    keyboard: arg,
  });
}

export const back_with_edit_button = {
  reply_markup: reply_markup(back_with_edit_keyboard),
};
export const menu = { reply_markup: reply_markup(menuKeyboard) };
export const back = { reply_markup: reply_markup(backKeyboard) };
export const help = { reply_markup: reply_markup(backKeyboard) };
export const profile = { reply_markup: reply_markup(profileKeyboard) };
export const edit = { reply_markup: reply_markup(editKeyboard) };

export const appointment = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: appointmentButtons.AppointmentsHistory,
          callback_data: 'appointmentsHistory',
        },
      ],
      [
        {
          text: appointmentButtons.BookedAppointments,
          callback_data: 'bookedAppointments',
        },
      ],
    ],
  },
};
