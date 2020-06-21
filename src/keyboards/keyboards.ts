import { menuButtons } from './key-board-buttons';

export const menu = {
  reply_markup: JSON.stringify({
    keyboard: [
      [menuButtons.PriceList, menuButtons.BarberList],
      [menuButtons.Appointments],
      [menuButtons.SignUpForAnAppointment],
      [menuButtons.EnterEmailAddress]
    ]
  })
};

export const back = {
  reply_markup: JSON.stringify({
    resize_keyboard: true,
    keyboard: [
      [menuButtons.Back]
    ]
  })
};

export const help = {
  reply_markup: JSON.stringify({
    resize_keyboard: true,
    keyboard: [
      [menuButtons.Back]
    ]
  })
};

export const appointment = {
  reply_markup:{
    inline_keyboard:[
      [
        {
          text: 'Appointments history',
          callback_data: 'appointmentsHistory'
        }
      ],
      [
        {
          text: 'Booked appointments',
          callback_data: 'bookedAppointments'
        }
      ]
    ]
  }
};
