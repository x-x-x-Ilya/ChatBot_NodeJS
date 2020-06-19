export const menu = {
  reply_markup: JSON.stringify({
    keyboard: [
      ['Show price list', 'Show barber list'],
      ['Show scheduled appointments', 'Show appointments history', 'Sign up for an appointment'],
      ['Enter email address - for mailing']
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
