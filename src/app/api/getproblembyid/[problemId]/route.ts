import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import ProblemsModel from "@/models/Problems";

export async function GET(request: NextRequest, { params }: { params: { problemId: string } }) {
    const problemId = params.problemId;
    await dbConnect();
    try {
        // Ensure problemId is a string
        const problems = await ProblemsModel.findById(problemId);
        if (!problems) {
            return NextResponse.json({
                success: false,
                message: "Problem not found",
            }, { status: 404 });
        } else {
            return NextResponse.json({
                success: true,
                data: problems,
                message: "Problems by Id fetched successfully"
            }, { status: 200 });
        }
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message || 'Something went wrong on fetching problems by Id',
        }, { status: 500 });
    }
}
