import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import ProblemsModel from "@/models/Problems";
import UserModel from "@/models/User";

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
    const username = params.username;
    await dbConnect();
    try {
        // Ensure problemId is a string
        const user = await ProblemsModel.find({username : username});

        if(!user){
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 500 });
        }


        return NextResponse.json({
            success: true,
            data: user,
            message: "User by username fetched successfully"
        }, { status: 200, headers: { 'Cache-Control': 'no-store' } });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message || 'Something went wrong on fetching Userby username',
        }, { status: 500 });
    }
}
