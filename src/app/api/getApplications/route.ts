import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import problemSetterModel from "@/models/ProblemSetterForm";

export async function GET(request: NextRequest) {
    await dbConnect();
    try {
        const verifiedApplications = await problemSetterModel.find({});
        return NextResponse.json({
            success: true,
            data: verifiedApplications,
            message: "All verified problem setter applications fetched successfully"
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message || 'Something went wrong on fetching verified applications',
        }, { status: 500 });
    }
}
