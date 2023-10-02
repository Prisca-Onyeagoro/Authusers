import User from '@/models/Usermodel';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';

export const sendEmail = async ({ email }) => {
  try {
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
      html: `<p>click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${'RESET YOUR PASSWORD'}</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
