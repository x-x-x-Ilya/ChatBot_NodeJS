export const menu = {
  reply_markup: JSON.stringify({
    keyboard: [
      ['Show price list'],
      ['Show barber list'],
      ['Sign up for an appointment'],
      ['Show my appointments'],
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
