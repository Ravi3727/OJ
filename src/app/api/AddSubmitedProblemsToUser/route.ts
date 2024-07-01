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

    const { codeSubmisionData, problemId, title, difficulty, codeSubmisionDate, userEmail } = await request.json();

    if (!codeSubmisionData || !problemId || !title || !difficulty || !codeSubmisionDate || !userEmail) {
        return NextResponse.json(
            { success: false, message: 'Invalid data' },
            { status: 400 }
        );
    }

    try {
        const user = await UserModel.findOne({ email: userEmail });
        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        let testCaseFailed: number | undefined;
        let result: string;

        for (let i = 0; i < codeSubmisionData.length; i++) {
            if (!codeSubmisionData[i].passed) {
                testCaseFailed = i + 1;
                break;
            }
        }

        result = testCaseFailed ? `WA on ${testCaseFailed} test case` : "Accepted";
        const newProblemSolved = {
            problemId: problemId,
            title,
            difficulty,
            status: result,
            codeSubmisionDate: new Date(codeSubmisionDate)
          };
          console.log(typeof(newProblemSolved))
          user.QuestionsSolved.push(newProblemSolved);
        
        // user.QuestionsSolved.push(newProblemSolved);

        await user.save();

        return NextResponse.json(
            { message: `Problem submission updated successfully`, success: true, QuestionsSolved: user.QuestionsSolved },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating problem:', error);
        return NextResponse.json(
            { message: 'Error updating problem', success: false },
            { status: 500 }
        );
    }
}
