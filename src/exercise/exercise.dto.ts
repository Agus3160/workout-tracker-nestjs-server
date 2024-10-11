import { readExerciseTypeDtoSchema } from 'src/exercise-type/exercise-type.dto';
import { readMuscleGroupDtoSchema } from 'src/muscle-group/muscle-group.dto';
import { baseDtoSchema, queryFindAllBaseDtoSchema } from 'src/util/base/dto';
import { transformQueryStringArray } from 'src/util/util';
import { z } from 'zod';

//CREATE
export const createExerciseDtoSchema = z.object({
  name: z.string().max(64),
  description: z.string(),
  imageUrl: z.string(),
  tutorialUrl: z.string(),
  exerciseTypes: z.string().ulid().array().default([]),
  muscleGroups: z.string().ulid().array().default([]),
});

//UPDATE
export const updateExerciseDtoSchema = createExerciseDtoSchema.partial();

//READ
export const readExerciseWithRelatedDtoSchema = baseDtoSchema
  .merge(
    createExerciseDtoSchema.omit({ muscleGroups: true, exerciseTypes: true }),
  )
  .extend({
    muscleGroups: readMuscleGroupDtoSchema.array(),
    exerciseTypes: readExerciseTypeDtoSchema.array(),
  });

//READ-PAGINATION
export const readExerciseDtoSchema = baseDtoSchema
  .merge(
    createExerciseDtoSchema.omit({ muscleGroups: true, exerciseTypes: true }),
  )
  .extend({
    muscleGroups: readMuscleGroupDtoSchema
      .pick({ id: true, name: true })
      .array(),
    exerciseTypes: readExerciseTypeDtoSchema
      .pick({ id: true, name: true })
      .array(),
  });

//FIND-ALL
export const exerciseFindAllFilterDtoSchema = queryFindAllBaseDtoSchema.extend({
  name: z.string().max(64).optional(),
  description: z.string().optional(),
  exerciseTypes: z
    .union([z.string().uuid(), z.array(z.string().uuid())])
    .optional()
    .transform(transformQueryStringArray),
  muscleGroups: z
    .union([z.string().uuid(), z.array(z.string().uuid())])
    .optional()
    .transform(transformQueryStringArray),
});

//DTO
export type CreateExerciseDto = z.infer<typeof createExerciseDtoSchema>;
export type UpdateExerciseDto = z.infer<typeof updateExerciseDtoSchema>;
export type ReadExerciseDto = z.infer<typeof readExerciseDtoSchema>;
export type ExerciseFindAllFilterDto = z.infer<
  typeof exerciseFindAllFilterDtoSchema
>;
