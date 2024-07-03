import { z } from 'zod';

export const problemSchema = z.object({
    username: z.string().min(4, { message: 'Username must be at least 2 characters' }),
    statement: z.string().min(10, { message: 'Problem statement must be at least 10 characters' }),
    title: z.string().max(30, { message: 'Problem title must be at most 30 characters' }),
    testCases: z.array(z.object({
        input: z.string(),
        output: z.string()
    })).min(1, { message: 'At least one testCase is required' }),
    
    tags: z.array(z.string()).min(1, { message: 'At least one tag is required' }), // Rename to "tags"
    

    difficulty: z.string().min(4, { message: 'Difficulty must be at least 4 characters' }),
});



// tags: z.array(z.object({
//     input: z.string(),
//     output: z.string()
// })).min(1, { message: 'At least one tag is required' }),
// testCases: z.array(z.string()).min(1, { message: 'At least one testCase is required' }),