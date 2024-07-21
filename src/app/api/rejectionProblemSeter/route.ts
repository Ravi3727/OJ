import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { sendProblemSetterResultEmail } from "@/helpers/sendProblemSetterResultEmail";



export async function POST(request: NextRequest) {

    const { username,email,result } = await request.json();
    try {
        const sendResultEmailResponse = await sendProblemSetterResultEmail(
            result, username, email
        );
        // console.log(sendResultEmailResponse.success);
        if (sendResultEmailResponse.success === true) {
            return NextResponse.json(
                { message: `User Verified for Problem Setter`, success: true, ApplicationResult: result },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { message: `User Not Verified for Problem Setter`, success: true, ApplicationResult: result },
                { status: 200 }
            );
        }


    } catch (error) {
        console.error('Error updating user problem setter verification:', error);
        return NextResponse.json(
            { message: 'Error updating user problem setter verification', success: false },
            { status: 500 }
        );
    }
}



