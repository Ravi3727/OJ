// Import necessary dependencies
import { sendproblemSetterEmail } from "@/helpers/sendproblemSetterEmail";
import { dbConnect } from "@/lib/dbConnect";

// Export the POST method function
export async function POST(request: Request) {
    await dbConnect(); // Assuming this function connects to your database

    try {
        // Destructure request body variables
        const { leetCode, codeForces, codeCheaf, other, username } = await request.json();

        // Call function to send problem setter email
        const verifyEmailResponse = await sendproblemSetterEmail(
            leetCode, codeForces, codeCheaf, other, username
        );

        // Handle response from sending email
        if (!verifyEmailResponse.success) {
            return new Response(JSON.stringify({
                success: false,
                message: verifyEmailResponse.message || 'Verification problem setter email failed',
            }), { status: 500 });
        }

        // Return success response if email sent successfully
        return new Response(JSON.stringify({
            success: true,
            message: "Success problem setter",
        }), { status: 201 });

    } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error in problem setter", error);
        return new Response(JSON.stringify({
            success: false,
            message: "User Problem setter failed",
        }), { status: 500 });
    }
}
