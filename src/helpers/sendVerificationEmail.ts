
import { resend } from '@/lib/resend';
import VerificationEmail from '../../Emails/verficationEmail';

import { ApiResponse } from '@/Types/ApiResponse';

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string,
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'TheOnlineJudge@ravik.me',
            to: email,
            subject: "OJ verification Otp",
            react: VerificationEmail({ username, otp: verifyCode }),
        });


        return { success: true, message: "Verification email sent successfully" }
    } catch (emailError) {
        console.error("Error sending verification email", emailError);
        return { success: false, message: "failed Error sending verification email" }
    }
}