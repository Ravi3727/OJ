import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import UserModel, { UserProfile } from "@/models/User";
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/options';

export async function POST(request: NextRequest, { params }: { params: { contestId: string } }) {
    await dbConnect();
    const contestId = params.contestId;
    const session = await getServerSession(authOptions);
    const _user = session?.user;

    if (!session || !_user) {
        return NextResponse.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
        );
    }

    const userID = session.user._id;

    try {
        const user: UserProfile | null = await UserModel.findById(userID);
        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        // Check if the contest is already in ParticipatedContests
        const existingContest = user.ParticipatedContests.find(contest => contest.contestId === contestId);
        if (existingContest) {
            return NextResponse.json(
                { message: `Contest ${contestId} already added to user ${userID}`, success: true },
                { status: 200 }
            );
        }

        // If not already added, add the contest
        const newContestObj = {
            contestId: contestId,
            problemsSolved: [],
        };
        user.ParticipatedContests.push(newContestObj);
        await user.save();

        return NextResponse.json(
            { message: 'Successfully added contest to user', success: true },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error adding contest to user:', error);
        return NextResponse.json(
            { message: 'Error adding contest to user', success: false },
            { status: 500 }
        );
    }
}
