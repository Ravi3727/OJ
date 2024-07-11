import { z } from "zod";

export const problemSetterSchema = z.object({
  leetCode: z.string().min(2,{"message": "Please enter a valid leetCode URL"}),
  codeForces: z.string().optional(),
  codeCheaf: z.string().optional(),
  other: z.string().optional(),
  username:  z.string().min(2,{"message": "Please enter a valid username"}),
});