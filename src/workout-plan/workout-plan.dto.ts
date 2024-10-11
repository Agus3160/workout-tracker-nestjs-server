import { baseDtoSchema, queryFindAllBaseDtoSchema } from 'src/util/base/dto';
import { createWorkoutDetailDtoSchema, readWorkoutDetailDtoSchema } from 'src/workout-detail/workout-detail.dto';
import { z } from 'zod';

//CREATE
export const createWorkOutPlanDtoSchema = z.object({
  name: z.string().max(64),
  description: z.string(),
  workOutDetails: createWorkoutDetailDtoSchema.array(),
});
export type CreateWorkOutPlanDto = z.infer<typeof createWorkOutPlanDtoSchema>;

//UPDATE
export const updateWorkOutPlanDtoSchema = createWorkOutPlanDtoSchema.omit({ workOutDetails: true }).extend({
  workOutDetails: readWorkoutDetailDtoSchema.partial().array(),
}).partial();
export type UpdateWorkOutPlanDto = z.infer<typeof updateWorkOutPlanDtoSchema>;

//READ-DETAILED
export const readWorkOutPlanWithRelationsDtoSchema = baseDtoSchema.merge(
  createWorkOutPlanDtoSchema,
);
export type ReadWorkOutPlanWithRelationsDto = z.infer<typeof readWorkOutPlanWithRelationsDtoSchema>;

//READ-FIND-ALL
export const readWorkOutPlanDtoSchema = baseDtoSchema.merge(
  createWorkOutPlanDtoSchema.omit({ workOutDetails: true }),
)
export type ReadWorkOutPlanDto = z.infer<typeof readWorkOutPlanDtoSchema>;

//FILTER
export const workOutPlanFindAllFilterDtoSchema =
  queryFindAllBaseDtoSchema.merge(
    createWorkOutPlanDtoSchema.omit({ workOutDetails: true }).partial(),
  );
export type WorkOutPlanFindAllFilterDto = z.infer<
  typeof workOutPlanFindAllFilterDtoSchema
>;