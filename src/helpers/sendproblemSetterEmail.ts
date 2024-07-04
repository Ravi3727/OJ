'use client'
import { resend } from '@/lib/resend';
import FormSubmitEmail from '../../Emails/FormSubmitEmail';

import { ApiResponse } from '@/Types/ApiResponse';

export async function sendproblemSetterEmail(
    leetCode: string,
    codeForces: string,
    codeCheaf: string,
    other: string,
    username: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            // from:'rk3727000@gmail.com',
            from: 'onboarding@resend.dev',
            to: "rk3727000@gmail.com",
            subject: "OJ verification Otp",
            react: FormSubmitEmail({ leetCode, codeForces, codeCheaf, other, username })
        });


        return { success: true, message: "Problem setter form sent successfully" }
    } catch (emailError) {
        console.error("Error sending problem setter email", emailError);
        return { success: false, message: "failed Error sending problem setter email" }
    }
}