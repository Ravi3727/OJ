
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
            // from:'rk3727000@gmail.com',
            from: 'onboarding@resend.dev',
            to: "rk3727000@gmail.com",
            subject: "OJ verification Otp",
            react: VerificationEmail({ username, otp: verifyCode }),
        });


        return { success: true, message: "Verification email sent successfully" }
    } catch (emailError) {
        console.error("Error sending verification email", emailError);
        return { success: false, message: "failed Error sending verification email" }
    }
}