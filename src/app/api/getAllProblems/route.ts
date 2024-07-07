import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import ProblemsModel from "@/models/Problems";


export async function GET(request: NextRequest, response: NextResponse) {
    await dbConnect();
    try {
        const problems = await ProblemsModel.find({});
        // console.log("All problems fetched successfully",problems);
        return Response.json({
            success: true,
            data: problems,
            message: "All problems fetched successfully"
        }, { status: 200 });
        
    }
    catch (error: any) {
        return Response.json({
            success: false,
            message: error.message || 'Something went wrong on fetching All problems',
        }, { status: 500 })
    }
}