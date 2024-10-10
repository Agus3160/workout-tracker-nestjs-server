import { baseDtoSchema, queryFindAllBaseDtoSchema } from 'src/util/base/dto';
import { z } from 'zod';

export const createExerciseTypeDtoSchema = z.object({
  name: z.string().max(64),
  description: z.string(),
});
export const updateExerciseTypeDtoSchema = createExerciseTypeDtoSchema.partial();
export const readExerciseTypeDtoSchema = baseDtoSchema.merge(createExerciseTypeDtoSchema);
export const exerciseTypeFindAllFilterDtoSchema =
  queryFindAllBaseDtoSchema.extend({
    name: z.string().optional(),
    description: z.string().optional(),
  });

export type CreateExerciseTypeDto = z.infer<typeof createExerciseTypeDtoSchema>;
export type UpdateExerciseTypeDto = z.infer<typeof updateExerciseTypeDtoSchema>;
export type ReadExerciseTypeDto = z.infer<typeof readExerciseTypeDtoSchema>;
export type ExerciseTypeFindAllFilterDto = z.infer<typeof exerciseTypeFindAllFilterDtoSchema>;
