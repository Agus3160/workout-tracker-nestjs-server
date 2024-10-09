import { baseDtoSchema, queryFindAllBaseDtoSchema } from 'src/util/base/dto';
import { userRoles } from 'src/entities/user.entity';
import { z } from 'zod';

export const createUserDtoSchema = z.object({
  username: z.string().max(32),
  email: z.string().email(),
  role: z.enum(userRoles).optional().default('USER'),
  password: z.string().min(8),
});
export const updateUserDtoSchema = createUserDtoSchema.partial();
export const readUserDtoSchema = baseDtoSchema.merge(
  createUserDtoSchema.omit({ password: true }),
);

export const userFindAllFilterDtoSchema = queryFindAllBaseDtoSchema.extend({
  username: z.string().optional(),
  email: z.string().optional(),
  role: z.enum(userRoles).optional(),
})

export type UserFindAllFilterDto = z.infer<typeof userFindAllFilterDtoSchema>;
export type ReadUserDto = z.infer<typeof readUserDtoSchema>;
export type CreateUserDto = z.infer<typeof createUserDtoSchema>;
export type UpdateUserDto = z.infer<typeof updateUserDtoSchema>;
