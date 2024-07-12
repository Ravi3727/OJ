import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/User";
import {sendProblemSetterResultEmail} from "@/helpers/sendProblemSetterResultEmail";
import problemSetterModel from "@/models/ProblemSetterForm";


export async function POST(request: NextRequest) {
    await dbConnect();

    const { username } = await request.json();
    const User = await UserModel.findOne({ username: username });
    const ProblemSetter = await problemSetterModel.findOne({ username: username });
    try {
        if (!User || !ProblemSetter) {
            return NextResponse.json(
                { message: `User or Problem Setter not found`, success: false },
                { status: 404 }
            );
        } else {
            // console.log("User Record Result Found", User);
            User.isProblemSetter = false;
            ProblemSetter.verified = false;
            await User.save();
            await ProblemSetter.save();
            
            // send email to user
            const email = User.email;
            const result = User.isProblemSetter;
            const sendResultEmailResponse = await sendProblemSetterResultEmail(
                result, username, email
            );
            console.log(sendResultEmailResponse.success);
            if(sendResultEmailResponse.success === true){
                return NextResponse.json(
                    { message: `User Removed from Problem Setter`, success: true, ApplicationResult: User.isProblemSetter },
                    { status: 200 }
                );
            }else{
                return NextResponse.json(
                    { message: `User Not Removed from Problem Setter`, success: false, ApplicationResult: User.isProblemSetter },
                    { status: 400 }
                );
            }
        }

    } catch (error) {
        console.error('Error updating user problem setter remove verification:', error);
        return NextResponse.json(
            { message: 'Error updating user problem setter remove verification', success: false },
            { status: 500 }
        );
    }
}



