import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import ProblemsModel from "@/models/Problems";
import { getServerSession } from 'next-auth/next';
import { User } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/options';

export async function DELETE(request: NextRequest, { params }: { params: { problemId: string } }) {
  const problemID = params.problemId;
  await dbConnect();
  const session = await getServerSession(authOptions);
  const _user: User = session?.user;
  if (!session || !_user) {
    return NextResponse.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  try {
    const deleteResult = await ProblemsModel.deleteOne({ _id: problemID });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { message: 'Problem not found or already deleted', success: false },
        { status: 404 }
      );
    }

    const updatedProblems = await ProblemsModel.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      { message: `Problem ${problemID} deleted successfully`, success: true, data: updatedProblems },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting problem:', error);
    return NextResponse.json(
      { message: 'Error deleting problem', success: false },
      { status: 500 }
    );
  }
}
