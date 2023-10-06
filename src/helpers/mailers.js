import auth from '@/models/Usermodel';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    // create a hashedtoken
    const hashedtoken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === 'VERIFY') {
      await auth.findByIdAndUpdate(userId, {
        verifyToken: hashedtoken,
        verifyTokenExpiry: Date.now() + 36000000,
      });
    } else if (emailType === 'RESET') {
      await auth.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedtoken,
        forgotPasswordTokenExpiry: Date.now() + 36000000,
      });
    }

    var transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '9341a29a1333ee',
        pass: 'd6000f56487a95',
      },
    });

    const mailOptions = {
      from: 'priscaonyeagoro@gmail.com',
      to: email,
      subject:
        emailType === 'VERIFY' ? 'verify your email' : 'Reset your password',
      html: `<p>${
        emailType === 'VERIFY'
          ? `click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedtoken}">here</a>`
          : `click  <a href="${process.env.DOMAIN}/passwordreset?token=${hashedtoken}">here</a>`
      }     to${
        emailType === 'VERIFY' ? 'verify your email' : 'reset your password'
      }  ${
        emailType === 'VERIFY'
          ? `copy and paste this link in your browser below ---->${process.env.DOMAIN}/verifyemail?token=${hashedtoken}`
          : `copy and paste this link in your browser below ---->${process.env.DOMAIN}/passwordreset?token=${hashedtoken}`
      }</p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
