// Import necessary dependencies
import { sendproblemSetterEmail } from "@/helpers/sendproblemSetterEmail";
import { dbConnect } from "@/lib/dbConnect";
import problemSetterModel from "@/models/ProblemSetterForm";
import { NextResponse } from "next/server";

// Export the POST method function
export async function POST(request: Request,response:NextResponse) {
    await dbConnect(); // Assuming this function connects to your database

    try {
        // Destructure request body variables
        const { leetCode, codeForces, codeCheaf, other, username } = await request.json();

        if ( !username || !codeForces || !leetCode) {
            return NextResponse.json({
                success: false,
                message: "Username, codeForces and leetCode URL are required",
            }, {
                status: 400
            });
        }

        const participant = { leetCode, codeForces, codeCheaf, other, username, createdAt: new Date()};
        const savedParticipant = await problemSetterModel.create(participant);

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
        return NextResponse.json({
            success: true,
            message: "Problem Setter Participant saved successfully",
            data: savedParticipant
        }, { status: 200 });

    } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error in problem setter", error);
        return new Response(JSON.stringify({
            success: false,
            message: "User Problem setter failed",
        }), { status: 500 });
    }
}
