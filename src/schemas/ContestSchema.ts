import { z } from 'zod';

export const contestSchema = z.object({
    description: z.string().min(10, { message: 'Problem statement must be at least 10 characters' }),
    title: z.string().max(30, { message: 'Contest title must be at most 30 characters' }),
    problems: z.array(z.string()).min(1, { message: 'At least one tag is required' }),
    difficulty: z.string().min(4, { message: 'Difficulty must be at least 4 characters' }),
    eventDate: z.string(),
    HostedBy : z.string().min(2, { message: 'HostedBy must be at least 2 characters' }),
});