import {z} from 'zod';
import { dbConnect} from '@/lib/dbConnect';
import { userNameValidation } from '@/schemas/signUpSchema';
import UserModel from '@/models/User';


const UserNameQuiqueSchema = z.object({
    username:userNameValidation,
})


export async function GET(request: Request){
    if(request.method !== 'GET'){
        return Response.json({
            success: false,
            message:"Inavlid method only GET method is allowed"
        },{status:405})
    }
    await dbConnect()

    try {
        const {searchParams} = new URL(request.url)
        const queryparam = {
            username : searchParams.get('username')
        }

        const result = UserNameQuiqueSchema.safeParse(queryparam)
        // console.log("Response of username uniqueness" , result)

        if(!result.success){
            const usernameUniqueError = result.error.format().username?._errors || []

            return Response.json({
                success:false,
                message:usernameUniqueError.length > 0 ? usernameUniqueError.join(', '):"Error unique username unvalid"
            },{status:400})
        }

        const {username} = result.data;

        const existingVerifiedUserName = await UserModel.findOne({username, isVerified:true})

        if(existingVerifiedUserName){
            return Response.json({
                success:false,
                message:"User name is already taken",
            },{status : 400})
        }

        return Response.json({
            success:true,
            message:"Username is unique",
        },{status : 200})
        


    } catch (error) {
        console.error("Error usernmae unique" , error);
        return Response.json({
            success:false,
            message:"Error checking username"
        },{ status: 500})
    }
}