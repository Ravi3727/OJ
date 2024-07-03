import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/User";
import { getServerSession } from 'next-auth/next';
import { User } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';


export async function POST(request: NextRequest) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const _user: User = session?.user;
    if (!session || !_user) {
        return NextResponse.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
        );
    }
    // console.log("session backend", session);
    const { bio, email } = await request.json();
    const User = await UserModel.findOne({ email: email });
    // console.log("User ", User);

    try {
        if (!User) {
            return NextResponse.json(
                { message: `User not found`, success: false },
                { status: 404 }
            );
        } else {
            User.userBio = bio;
            await User.save();
            return NextResponse.json(
                { message: `Bio updated successfully`, success: true, userBio: User.userBio },
                { status: 200 }
            );
        }

    } catch (error) {
        console.error('Error updating problem:', error);
        return NextResponse.json(
            { message: 'Error updating problem', success: false },
            { status: 500 }
        );
    }
}