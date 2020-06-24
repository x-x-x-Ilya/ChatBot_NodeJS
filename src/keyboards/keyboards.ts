import { menuButtons } from './key-board-buttons';

export const menu = {
  reply_markup: JSON.stringify({
    resize_keyboard: true,
    keyboard: [
      [menuButtons.PriceList, menuButtons.BarberList],
      [menuButtons.Appointments, menuButtons.SignUpForAnAppointment],
      [menuButtons.MyProfile]
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

export const profile = {
  reply_markup: JSON.stringify({
    resize_keyboard: true,
    keyboard: [
      ['send my email', 'send my last_name']
    ]
  })
};