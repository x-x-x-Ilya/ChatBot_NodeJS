
export const menu = {
  reply_markup: JSON.stringify({
    keyboard: [
      ['Show price list'],
      ['Show barbers list'],
      ['Sign up for a service'],
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
