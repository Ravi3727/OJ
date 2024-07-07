import { z } from 'zod';

export const EditProblemSchema = z.object({
    username: z.string(),
    statement: z.string(),
    title: z.string(),
    testCases: z.array(z.object({
        input: z.string(),
        output: z.string()
    })),
    
    tags: z.array(z.string()), // Rename to "tags"
    

    difficulty: z.string(),
});