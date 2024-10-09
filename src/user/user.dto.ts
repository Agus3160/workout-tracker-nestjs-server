import { baseDtoSchema } from 'src/util/base/dto';
import { z } from 'zod';

export const createUserDtoSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});
export const updateUserDtoSchema = createUserDtoSchema.partial();
export const readUserDtoSchema = baseDtoSchema.merge(
  createUserDtoSchema.omit({ password: true }),
);

export type ReadUserDto = z.infer<typeof readUserDtoSchema>;
export type CreateUserDto = z.infer<typeof createUserDtoSchema>;
export type UpdateUserDto = z.infer<typeof updateUserDtoSchema>;
