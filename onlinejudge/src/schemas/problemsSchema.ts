import {z} from 'zod';

export const problemSchema = z.object({
    statement: z.string().min(10,{message: 'Problem statement must be at least 10 characters'}),
})
