import { Injectable } from '@nestjs/common';
import {
  CreateWorkoutDetailDto,
  readWorkoutDetailDtoSchema,
  UpdateWorkoutDetailDto,
  WorkoutDetailFindAllFilterDto,
} from './workout-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkoutDetail } from 'src/entities/workout-detail.entity';
import { getCommonsFilterValues } from 'src/util/util';

@Injectable()
export class WorkoutDetailService {
  constructor(
    @InjectRepository(WorkoutDetail)
    private readonly workoutDetailService: Repository<WorkoutDetail>,
  ) {}

  async create(dto: CreateWorkoutDetailDto) {
    const newWorkoutDetail = await this.workoutDetailService.save(dto);
    return readWorkoutDetailDtoSchema.parse(newWorkoutDetail);
  }

  async findAll(filter: WorkoutDetailFindAllFilterDto) {
    const commonsFilter = getCommonsFilterValues(filter);
    const [workoutDetailsEntities, count] =
      await this.workoutDetailService.findAndCount({
        ...commonsFilter,
        relations: {
          exercise: true,
        },
        where: {
          ...commonsFilter.where,
          exercise:{
            id: filter.exerciseId ? filter.exerciseId : undefined
          },
          reps: filter.reps ? filter.reps : undefined,
          sets: filter.sets ? filter.sets : undefined,
          restTimeSec: filter.restTimeSec ? filter.restTimeSec : undefined,
          weigth: filter.weigth ? filter.weigth : undefined,
          week: filter.week ? filter.week : undefined,
          day: filter.weekDay ? filter.weekDay : undefined,
        },
      });
    return {
      values: workoutDetailsEntities.map((workoutDetail) =>
        readWorkoutDetailDtoSchema.parse(workoutDetail),
      ),
      total: count,
      skip: filter.skip,
      take: filter.take,
    };
  }

  async findOne(id: string) {
    const workoutDetail = await this.workoutDetailService.findOne({
      where: { id },
      relations: {
        exercise: true,
      },
    });
    return readWorkoutDetailDtoSchema.parse(workoutDetail);
  }

  async update(id: string, dto: UpdateWorkoutDetailDto) {
    const workoutDetail = await this.workoutDetailService.save({ id, dto });
    return readWorkoutDetailDtoSchema.parse(workoutDetail);
  }

  async remove(id: string) {
    await this.workoutDetailService.delete(id);
  }
}
