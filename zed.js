const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'priscaonyeagoro@gmail.com',
    pass: process.env.GOOGLEAPP,
  },
});

const mailOptions = {
  from: 'priscaonyeagoro@gmail.com',
  to: 'priscaonyeagoro716@gmail.com',
  subject: 'Reset Your password',
  html: 'from nodemailer testing.js',
};

transport.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
