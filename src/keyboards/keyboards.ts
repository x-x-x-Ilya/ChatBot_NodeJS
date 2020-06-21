import { menuButtons } from './key-board-buttons';

export const menu = {
  reply_markup: JSON.stringify({
    keyboard: [
      [menuButtons.PriceList, menuButtons.BarberList],
      [menuButtons.ScheduledAppointments, menuButtons.AppointmentsHistory],
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