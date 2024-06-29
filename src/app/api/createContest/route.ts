import { dbConnect } from "@/lib/dbConnect";
import contestModel from "@/models/Contests";
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';
import { User } from "next-auth";
export async function POST(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const _user: User = session?.user;

    if (!session || !_user) {
        return Response.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
        );
    }

    try {
        const { title, description, eventDate, difficulty, HostedBy, problems, duration } = await request.json();
        // console.log(typeof(eventDate));
        if (!title || !description || !eventDate || !difficulty || !HostedBy || !problems || !duration) {
            return Response.json({
                success: false,
                message: "All feilds are required",
            }, {
                status: 400
            });
        }

        const newContest = { title, description, eventDate, problems, difficulty, HostedBy, duration }


        // console.log("Coming from frontend form", newContest);

        const contest = await contestModel.create(newContest);

        // console.log("After creating contest on mongoDB database ", contest);
        return Response.json({
            success: true,
            message: "Contest created successfully",
            data: contest
        }, { status: 200 })

    } catch (error) {
        console.error("Error in creating contest", error);
        return Response.json({
            success: false,
            message: "Error in creating contest",
        }, {
            status: 500
        });
    }
}