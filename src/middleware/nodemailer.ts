import * as nodemailer from 'nodemailer';
import { log } from './logging';

export const mailer = ((email: string, message: string): void => {
  try {
    const mailTransport = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      port: 25,
      auth: { user: process.env.EMAIL_ADDRESS, pass: process.env.EMAIL_PASS },
      tls: { rejectUnauthorized: false }
    });
    mailTransport.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: 'Barbershop notification',
      text: message
    }, function(err, info) {
      console.log(info);
      if (err)
        console.log(err);
    });
  } catch (e) {
    log('./logs/_errors.txt', e, ' ');
  }
});
