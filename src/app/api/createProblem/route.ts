import { dbConnect } from "@/lib/dbConnect";
import ProblemsModel from "@/models/Problems";
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
        const { title, statement, testCases } = await request.json();

        if (!testCases || !title || !statement) {
            return Response.json({
                success: false,
                message: "All feilds are required",
            }, {
                status: 400
            });
        }

        const newProblem = { title, testCases, statement, createdAt: new Date() }

        const problem = await ProblemsModel.create(newProblem);

        return Response.json({

            success: true,
            message: "Problem created successfully",
            data: problem
        }, { status: 200 })



    } catch (error) {
        console.error("Error in creating problems", error);
        return Response.json({
            success: false,
            message: "Error in creating problems",
        }, {
            status: 500
        });
    }
}