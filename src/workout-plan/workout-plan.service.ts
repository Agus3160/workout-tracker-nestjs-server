import { Injectable } from '@nestjs/common';
import { CreateWorkOutPlanDto, readWorkOutPlanDtoSchema, readWorkOutPlanWithRelationsDtoSchema, UpdateWorkOutPlanDto, WorkOutPlanFindAllFilterDto } from './workout-plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutPlan } from 'src/entities/workout-plan.entity';
import { Like, Repository } from 'typeorm';
import { WorkoutDetail } from 'src/entities/workout-detail.entity';
import { getCommonsFilterValues } from 'src/util/util';

@Injectable()
export class WorkoutPlanService {

  constructor(
    @InjectRepository(WorkoutPlan)
    private readonly workoutPlanService: Repository<WorkoutPlan>,

    @InjectRepository(WorkoutDetail)
    private readonly workoutDetailService: Repository<WorkoutDetail>,
  ){}

  async create(dto:CreateWorkOutPlanDto) {
    const { workOutDetails:newWorkoutDetails } = dto;
    const newWorkoutDetailsEntities = await this.workoutDetailService.save(newWorkoutDetails);
    const workoutPlan = await this.workoutPlanService.save({...dto, workOutDetails: newWorkoutDetailsEntities});
    return readWorkOutPlanDtoSchema.parse(workoutPlan);
  }

  async findAll(filter:WorkOutPlanFindAllFilterDto) {
    const commonsFilter = getCommonsFilterValues(filter);
    const [workoutPlansEntities, count] = await this.workoutPlanService.findAndCount({
      ...commonsFilter,
      where: {
        ...commonsFilter.where,
        name: filter.name ? Like(`%${filter.name}%`) : undefined,
        description: filter.description ? Like(`%${filter.description}%`) : undefined,
      },
    });
    return {
      values: workoutPlansEntities.map((workoutPlan) => readWorkOutPlanDtoSchema.parse(workoutPlan)),
      total: count,
      skip: filter.skip,
      take: filter.take,
    };
  }

  async findOne(id: string) {
    const workoutPlan = await this.workoutPlanService.findOne({
      where: { id },
      relations: {
        workoutDetails: true,
      },
    });
    return readWorkOutPlanWithRelationsDtoSchema.parse(workoutPlan);
  }

  async update(id: string, dto:UpdateWorkOutPlanDto) {
    const { workOutDetails: newWorkoutDetails } = dto;
    const newWorkoutDetailsEntities = await this.workoutDetailService.save(newWorkoutDetails);
    const workoutPlan = await this.workoutPlanService.save({...dto, id, workOutDetails: newWorkoutDetailsEntities});
    return readWorkOutPlanDtoSchema.parse(workoutPlan);
  }

  async remove(id: string) {
    await this.workoutPlanService.delete(id);
  }
}
