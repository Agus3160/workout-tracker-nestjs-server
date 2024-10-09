import { baseDtoSchema, queryFindAllBaseDtoSchema } from "src/util/base/dto";
import { z } from "zod";

export const createMuscleGroupDtoSchema = z.object({
  name: z.string().max(64),
  description: z.string(),
})
export const updateMuscleGroupDtoSchema = createMuscleGroupDtoSchema.partial()
export const readMuscleGroupDtoSchema = baseDtoSchema.merge(createMuscleGroupDtoSchema);
export const muscleGroupFindAllFilterDtoSchema = queryFindAllBaseDtoSchema.extend({
  name: z.string().optional(),
  description: z.string().optional(),
})

export type CreateMuscleGroupDto = z.infer<typeof createMuscleGroupDtoSchema>
export type UpdateMuscleGroupDto = z.infer<typeof updateMuscleGroupDtoSchema>
export type ReadMuscleGroupDto = z.infer<typeof readMuscleGroupDtoSchema>
export type MuscleGroupFindAllFilterDto = z.infer<typeof muscleGroupFindAllFilterDtoSchema>