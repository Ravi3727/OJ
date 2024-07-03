import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import contestModel from "@/models/Contests";


export async function GET(request: NextRequest, response: NextResponse) {
    await dbConnect();
    try {
        const contest = await contestModel.find({});
        return Response.json({
            success: true,
            data: contest,
            message: "All contests fetched successfully"
        }, { status: 200 });

    }
    catch (error: any) {
        return Response.json({
            success: false,
            message: error.message || 'Something went wrong on fetching All contests',
        }, { status: 500 })
    }
}