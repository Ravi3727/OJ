import {z} from 'zod';

export const problemSchema = z.object({
    statement: z.string().min(10,{message: 'Problem statement must be at least 10 characters'}),
    title: z.string().max(50,{message: 'Problem title must be at most 30 characters'}),
    testCases: z.array(z.string()).min(1,{message: 'At least one test case is required'}),
    tags: z.array(z.string()).min(1,{message: 'At least one tag is required'}),
    difficulty: z.string().min(4,{message: 'Difficulty must be at least 4 characters'}),
})
