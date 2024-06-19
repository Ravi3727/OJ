import { z } from 'zod';


export const userNameValidation = z.string().min(2,"Username must be at least 2 characters").max(15,"Username must be at most 15 characters").regex(/^[a-zA-Z0-9_]+$/,"Username must not contain special characters")


export const signUpSchema = z.object({
    username : userNameValidation,
    email : z.string().email({message:"Invalid email address"}),
    password : z.string().min(6,{message:"Password must be at least 6 characters"}),
    collegename: z.string().min(3,{message:"College name must be at least 3 characters"}),
})