import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import contestModel from "@/models/Contests";

export async function POST(request: NextRequest, { params }: { params: { contest_id: string } }) {
    const contestId = params.contest_id;

    console.log("contestId backend se", contestId);
    await dbConnect();
    try {
        const { score, username }: { score: string; username: string } = await request.json();
        console.log("contest backend score", score );

        const contest = await contestModel.findById({ _id: contestId });
        console.log("contest backend", contest);
        const newParticipation = {
            username: username,
            score: score,
        };

        if (contest) {
            contest.users.push(newParticipation);
            await contest.save();
        }

        return NextResponse.json({
            success: true,
            data: contest,
            message: "Contest by Id fetched successfully"
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message || 'Something went wrong on fetching contest by Id',
        }, { status: 500 });
    }
}
