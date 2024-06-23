import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import ProblemsModel from "@/models/Problems";


export async function GET(request: NextRequest, { params }: { params: { problemId: string } }) {
    const problemId = params.problemId;
    await dbConnect();
    try {
        // console.log("ProblemId ", problemId);
        const problems = await ProblemsModel.findById({ _id: problemId });
        // console.log("ProblemId ", problems);
        return Response.json({
            success: true,
            data: problems,
            message: "Problems by Id fetched successfully"
        }, { status: 200 });

    }
    catch (error: any) {
        return Response.json({
            success: false,
            message: error.message || 'Something went wrong on fetching problems by Id',
        }, { status: 500 })
    }
}