import { menuButtons, profileButtons, appointmentButtons, editButtons } from './key-board-buttons';

export const menu = {
  reply_markup: JSON.stringify({
    resize_keyboard: true,
    keyboard: [
      [menuButtons.PriceList, menuButtons.BarberList],
      [menuButtons.SignUpForAnAppointment, menuButtons.checkDateAppointment],
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
          text: appointmentButtons.AppointmentsHistory,
          callback_data: 'appointmentsHistory'
        }
      ],
      [
        {
          text: appointmentButtons.BookedAppointments,
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
      [profileButtons.sendEmail, profileButtons.sendLastName],
      [profileButtons.Appointments, menuButtons.Back]
    ]
  })
};

export const edit = {
  reply_markup: JSON.stringify({
    resize_keyboard: true,
    keyboard: [
    [editButtons.ChangeDate, editButtons.ChangeBarber],
      [editButtons.ChangeService, editButtons.ChangeTime],
      [editButtons.Delete, menuButtons.Back]
      ]
  })
}