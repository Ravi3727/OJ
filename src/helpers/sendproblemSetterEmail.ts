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
export async function sendproblemSetterEmail(
    leetCode: string,
    codeForces: string,
    codeCheaf: string,
    other: string,
    username: string
): Promise<ApiResponse> {
    try {
        // await resend.emails.send({
        //     from: 'TheOnlineJudge@ravik.me',
        //     to: "rk3727000@gmail.com",
        //     subject: "OJ Problems Setter Application ",
        //     react: FormSubmitEmail({ leetCode, codeForces, codeCheaf, other, username })
        // });


        const mailOptions = {
            from: process.env.MAIL_USER,
            to: "rk3727000@gmail.com",
            subject: 'OJ Problem Setter Result',
            html: `
            <!DOCTYPE html>
            <html lang="en" dir="ltr">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Problem Setter Application</title>
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
                  a {
                    color: #1a73e8;
                    text-decoration: none;
                  }
                  a:hover {
                    text-decoration: underline;
                  }
                  .preview {
                    font-size: 1.1em;
                    margin-bottom: 20px;
                  }
                  .row {
                    margin-bottom: 10px;
                  }
                  .text {
                    margin-bottom: 20px;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="preview">Username: ${username}</div>
                  <div class="row">
                    <div class="text">Problem setter application from OJ</div>
                  </div>
                  <div class="row">
                    <h2>Leetcode link: <a href="${leetCode}">Click here to visit Leetcode</a></h2>
                  </div>
                  <div class="row">
                    <h2>CodeForces link: <a href="${codeForces}">Click here to visit CodeForces</a></h2>
                  </div>
                  <div class="row">
                    <h2>Codechef link: <a href="${codeCheaf}">Click here to visit Codechef</a></h2>
                  </div>
                  <div class="row">
                    <h2>Other link: <a href="${other}">Click here to visit Other</a></h2>
                  </div>
                </div>
              </body>
            </html>
            `,
        };

        const sendEmailStatus = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", sendEmailStatus);
        return { success: true, message: "Problem setter form sent successfully" }
    } catch (emailError) {
        console.error("Error sending problem setter email", emailError);
        return { success: false, message: "failed Error sending problem setter email" }
    }
}