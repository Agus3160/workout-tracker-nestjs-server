import { z } from "zod";

export const loginAuthSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})
export type LoginAuthDto = z.infer<typeof loginAuthSchema>