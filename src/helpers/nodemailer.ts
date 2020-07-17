// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');

export const mailer = ((email, subject, message) =>{
  const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: { user: process.env.EMAIL_ADDRESS, pass: process.env.EMAIL_PASS},
    tls: { rejectUnauthorized: false }
  });
  mailTransport.sendMail({
    from: process.env.EMAIL_ADDRESS,
    to: email,
    subject: subject,
    text: message
  }, function(err, info) {
    console.log(info);
    if(err)
      console.log(err);
  });
});

mailer('EXAMPLEMAIL@GMAIL.COM', 'hola mundo', 'test message :)');
