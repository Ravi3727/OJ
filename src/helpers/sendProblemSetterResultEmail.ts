import { ApiResponse } from '@/Types/ApiResponse';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    secure: true,
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});


export async function sendProblemSetterResultEmail(
    result: boolean,
    username: string,
    email: string,
): Promise<ApiResponse> {

    let finalResult: string = "";
    try {
        if (result === true) {
            finalResult = "Welcome to OJ Problem Setter Confirmation " + username + " you are now a problem setter at OJ";
        } else {
            finalResult = "You are removed from Problem Setter Position ";
        }

        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: 'OJ Problem Setter Result',
            html: `
            <!DOCTYPE html>
            <html lang="en" dir="ltr">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>OJ Problem Setter Result</title>
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
                  p {
                    color: #555555;
                    margin-bottom: 20px;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <h2>Hello ${username},</h2>
                  <p>${finalResult}</p>
                </div>
              </body>
            </html>
            `,
            
        };



        const sendEmailStatus = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", sendEmailStatus);
        return { success: true, message: "Result email sent successfully" };
    } catch (emailError) {
        console.error("Error sending result email", emailError);
        return { success: false, message: "failed Error sending result email" }
    }
}
