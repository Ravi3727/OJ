import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/User";

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
    const username = params.username;
    await dbConnect();
    try {
        // console.log("username ", username);
        
        // Use findOne to search by username
        const user = await UserModel.findOne({ username: username });
        // console.log("user ", user);
        return NextResponse.json({
            success: true,
            data: user,
            message: "User details fetched successfully"
        }, { status: 200 });

    }
    catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message || 'Something went wrong on fetching user information',
        }, { status: 500 });
    }
}
