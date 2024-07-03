import { z } from 'zod';



export const problemSetterSchema = z.object({
    username: z.string().min(2,{message: "please enter valid username"}),
    leetCode : z.string().min(6,{message:"Please enter valid link"}),
    codeForces : z.string().min(6,{message:"Please enter valid link"}),
    codeCheaf : z.string().min(6,{message:"Please enter valid link"}),
    other: z.string().min(3,{message:"Please enter valid link"}),
})