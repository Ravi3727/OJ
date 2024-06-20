import { z } from 'zod';
import { dbConnect } from '@/lib/dbConnect';
import { userNameValidation } from '@/schemas/signUpSchema';
import UserModel from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

const UserNameUniqueSchema = z.object({
  username: userNameValidation,
});

export async function GET(request: NextRequest) {
  if (request.method !== 'GET') {
    return NextResponse.json({
      success: false,
      message: 'Invalid method, only GET method is allowed',
    }, { status: 405 });
  }

  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);

    
    const queryParam = {
      username: searchParams.get('username'),
    };

    const result = UserNameUniqueSchema.safeParse(queryParam);

    if (!result.success) {
      const usernameUniqueError = result.error.format().username?._errors || [];

      return NextResponse.json({
        success: false,
        message: usernameUniqueError.length > 0 ? usernameUniqueError.join(', ') : 'Error unique username invalid',
      }, { status: 400 });
    }

    const { username } = result.data;

    const existingVerifiedUserName = await UserModel.findOne({ username, isVerified: true });

    if (existingVerifiedUserName) {
      return NextResponse.json({
        success: false,
        message: 'Username is already taken',
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Username is unique',
    }, { status: 200 });

  } catch (error) {
    console.error('Error username unique', error);
    return NextResponse.json({
      success: false,
      message: 'Error checking username',
    }, { status: 500 });
  }
}
