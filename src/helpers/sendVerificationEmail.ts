// import { resend } from '@/lib/resend';
// import VerificationEmail from '../../Emails/verficationEmail';
import nodemailer from 'nodemailer';
import { ApiResponse } from '@/Types/ApiResponse';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  secure: true,
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});


export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string,
): Promise<ApiResponse> {
  try {
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'OJ Verification OTP',
      html: `
        <!DOCTYPE html>
        <html lang="en" dir="ltr">
          <head>
            <meta charset="UTF-8">
            <title>Verification Code</title>
            <style>
              body {
                font-family: 'Roboto', Verdana, sans-serif;
                line-height: 1.5;
                margin: 0;
                padding: 20px;
                background-color: #f4f4f4;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              h2 {
                color: #333333;
              }
              .otp {
                font-size: 1.5em;
                font-weight: bold;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Hello ${username},</h2>
              <p>Thank you for registering. Please use the following verification code to complete your registration:</p>
              <p class="otp">${verifyCode}</p>
              <p>If you did not request this code, please ignore this email.</p>
            </div>
          </body>
        </html>
      `,
    };



    const sendEmailStatus = await transporter.sendMail(mailOptions).then(() => {
      return { success: true, message: "Verification email sent successfully" }
    }).catch(error => {
      console.error("Error One sending verification email", error);
    })

    return { success: true, message: "Verification email sent successfully second" }
  } catch (error) {
    console.error("Error sending verification email", error);
    return { success: false, message: "failed Error sending verification email" }
  }
}