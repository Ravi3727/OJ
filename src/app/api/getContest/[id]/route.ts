import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import contestModel from "@/models/Contests";


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const contestId = params.id;

    console.log("contestId", contestId);
    await dbConnect();
    try {
        const contest = await contestModel.findById({ _id: contestId });
        return Response.json({
            success: true,
            data: contest,
            message: "contest by Id fetched successfully"
        }, { status: 200, headers: { 'Cache-Control': 'no-store' } });

    }
    catch (error: any) {
        return Response.json({
            success: false,
            message: error.message || 'Something went wrong on fetching contest by Id',
        }, { status: 500 })
    }
}