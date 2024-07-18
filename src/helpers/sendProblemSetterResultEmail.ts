import { resend } from '@/lib/resend';
import ProblemSetterResultEmail from '../../Emails/ProblemSetterResultEmail';
import { ApiResponse } from '@/Types/ApiResponse';

export async function sendProblemSetterResultEmail(
    result: boolean,
    username: string,
    email: string,
): Promise<ApiResponse> {

    let fianalResult: string = "";
    try {
        if (result === true) {
            fianalResult = "Welcome to OJ Problem Setter Confirmation " + username + " you are now a problem setter at OJ";
        } else {
            fianalResult = "You are removed from Problem Setter Position ";
        }
        const { data, error } = await resend.emails.send({
            from: 'TheOnlineJudge@ravik.me',
            to: email,
            subject: "OJ Problem Setter Result",
            react: ProblemSetterResultEmail({ username, fianalResult: fianalResult, boolresult: result }),
        });
        if (error) {
            console.log("error", error);
            return { success: false, message: "failed Error sending verification email" }
        }

        return { success: true, message: "Verification email sent successfully" }
    } catch (emailError) {
        console.error("Error sending verification email", emailError);
        return { success: false, message: "failed Error sending verification email" }
    }
}
