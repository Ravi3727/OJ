import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/User";
import { getServerSession } from 'next-auth/next';
import { User } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/options';

export async function POST(request: NextRequest, { params }: { params: { contestId: string } }) {
    await dbConnect();
    const contestId = params.contestId;
    const session = await getServerSession(authOptions);
    const _user: User = session?.user;

    if (!session || !_user) {
        return NextResponse.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
        );
    }

    const userID = session.user._id;

    try {
        const user = await UserModel.findById(userID);
        console.log("User from perticipate contest", user);
        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        console.log("ye raha",user.ParticipatedContests);
        if((user.ParticipatedContests.find(contest => contest.contestId !== contestId)) || (user.ParticipatedContests.length === 0)){

        
        const newContestObj = {
            contestId: contestId,
            problemsSolved: [],
        }
        user.ParticipatedContests.push(newContestObj);
        user.save();

        return NextResponse.json(
            { message: 'Successfully added contest to user', success: true },
            { status: 200 }
        );
    }else{
        return NextResponse.json(
            { message: `Contest ${contestId} already added to user ${userID}`, success: true },
            { status: 200 }
        );
    }
    } catch (error) {
        console.error('Error adding contest to user:', error);
        return NextResponse.json(
            { message: 'Error adding contest to user', success: false },
            { status: 500 }
        );
    }
}
