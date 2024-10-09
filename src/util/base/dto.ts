import { z } from "zod";

export const baseDtoSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

export type BaseDtoType = z.infer<typeof baseDtoSchema>;