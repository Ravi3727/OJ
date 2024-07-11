import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function POST(request:Request){
    await dbConnect()

    try {
        const {username, code} = await request.json()

        const decodedUsername = decodeURIComponent(username)
        
        const user = await UserModel.findOne({
            username:decodedUsername
        })

        console.log(user);

        if(!user){
            return Response.json({
                success:false,
                message:"User not found"
            },{ status: 500})
        }

        console.log(user.verifyCode,code);
        const isOtpValid = user.verifyCode === code
        const isCodeExpired = new Date(user.verifyCodeExpiry) > new Date()


        if(isOtpValid && isCodeExpired) {
            user.isVerified = true;
            await user.save()

            return Response.json({
                success:true,
                message:"Account verified successfully"
            },{ status: 200})
        }else if(!isCodeExpired){
            return Response.json({
                success:false,
                message:"Verification code is expired please signUp again to get new Otp"
            },{ status: 400})
        }else{
            return Response.json({
                success:false,
                message:"Invalid verfication otp"
            },{ status: 400})
        }


    } catch (error) {
        console.error("Error verifying email otp" , error);
        return Response.json({
            success:false,
            message:"Error verifying email otp"
        },{ status: 500})
    }
}