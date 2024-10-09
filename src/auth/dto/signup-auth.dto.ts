import { z } from "zod";

export const signUpAuthSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});
export type SignUpAuthDto = z.infer<typeof signUpAuthSchema>;