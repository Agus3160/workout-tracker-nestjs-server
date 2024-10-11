import { readExerciseDtoSchema } from 'src/exercise/exercise.dto';
import { baseDtoSchema, queryFindAllBaseDtoSchema } from 'src/util/base/dto';
import { z } from 'zod';

export const createWorkoutDetailDtoSchema = z.object({
  weekDay: z.number().min(0).max(6),
  week: z.number(),
  weigth: z.number(),
  exerciseId: z.string().uuid(),
  reps: z.number().optional(),
  sets: z.number().optional(),
  restTimeSec: z.number().optional(),
});
export const updateWorkoutDetailDtoSchema =
  createWorkoutDetailDtoSchema.partial();
export const readWorkoutDetailDtoSchema = baseDtoSchema.merge(
  createWorkoutDetailDtoSchema,
);
export const readWorkOutDetailWithRelationsDtoSchema =
  readWorkoutDetailDtoSchema.omit({ exerciseId: true }).extend({
    exercise: readExerciseDtoSchema,
  });
export const workoutDetailFindAllFilterDtoSchema =
  queryFindAllBaseDtoSchema.merge(
    createWorkoutDetailDtoSchema.partial(),
  );

export type CreateWorkoutDetailDto = z.infer<
  typeof createWorkoutDetailDtoSchema
>;
export type UpdateWorkoutDetailDto = z.infer<
  typeof updateWorkoutDetailDtoSchema
>;
export type ReadWorkoutDetailDto = z.infer<typeof readWorkoutDetailDtoSchema>;
export type WorkoutDetailFindAllFilterDto = z.infer<
  typeof workoutDetailFindAllFilterDtoSchema
>;
