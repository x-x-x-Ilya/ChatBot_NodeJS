import * as nodemailer from 'nodemailer';

export const mailer = ((email, message) =>{
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
    if(err)
      console.log(err);
  });
});
