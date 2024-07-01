import { dbConnect } from "@/lib/dbConnect";
import ProblemsModel from "@/models/Problems";
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
        );
    }

    try {
        const { title, statement, testCases, tags, difficulty,username } = await request.json();

        if (!testCases || !title || !statement || !tags || !difficulty || !username) {
            return NextResponse.json({
                success: false,
                message: "All fields are required",
            }, {
                status: 400
            });
        }

        const newProblem = { title, testCases, statement, tags, difficulty, username };
        const problem = await ProblemsModel.create(newProblem);

        return NextResponse.json({
            success: true,
            message: "Problem created successfully",
            data: problem
        }, { status: 200 });

    } catch (error) {
        console.error("Error in creating problems", error);
        return NextResponse.json({
            success: false,
            message: "Error in creating problems",
        }, {
            status: 500
        });
    }
}
