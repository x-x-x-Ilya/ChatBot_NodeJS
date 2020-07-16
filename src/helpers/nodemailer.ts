// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');

export const mailer = ((email, subject, message) =>{
  const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: { user: "", pass: ''},
    tls: { rejectUnauthorized: false }
  });
  mailTransport.sendMail({
    from: 'iripinskij@gmail.com',
    to: email,
    subject: subject,
    text: message
  }, function(err, info) {
    console.log(info);
    if(err)
      console.log(err);
  });
});

mailer('', 'hola mundo', 'test message :)');
