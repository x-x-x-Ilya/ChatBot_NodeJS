export const menu = {
  reply_markup: JSON.stringify({
    keyboard: [
      ['Price list', 'Barber list'],
      ['Scheduled appointments', 'Appointments history'],
      ['Sign up for an appointment'],
      ['Enter email address']
    ]
  })
};

export const back = {
  reply_markup: JSON.stringify({
    keyboard: [
      ['Back']
    ]
  })
};
