import { z } from "zod";

export const schemaForm = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
});

export type FormSchema = z.infer<typeof schemaForm>;
