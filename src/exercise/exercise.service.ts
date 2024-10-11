import { Injectable } from '@nestjs/common';
import {
  CreateExerciseDto,
  ExerciseFindAllFilterDto,
  readExerciseDtoSchema,
  readExerciseWithRelatedDtoSchema,
  UpdateExerciseDto,
} from './exercise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from 'src/entities/exercise.entity';
import { ExerciseType } from 'src/entities/exercise-type.entity';
import { MuscleGroup } from 'src/entities/muscle-group.entity';
import { In, Like, Repository } from 'typeorm';
import { getCommonsFilterValues } from 'src/util/util';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,

    @InjectRepository(ExerciseType)
    private readonly exerciseTypeRepository: Repository<ExerciseType>,

    @InjectRepository(MuscleGroup)
    private readonly muscleGroupRepository: Repository<MuscleGroup>,
  ) {}

  async create(dto: CreateExerciseDto) {
    const muscleGroups = await this.muscleGroupRepository.findBy({
      id: In(dto.muscleGroups),
    });
    const exerciseType = await this.exerciseTypeRepository.findBy({
      id: In(dto.exerciseTypes),
    });
    const exercise = await this.exerciseRepository.save({
      ...dto,
      muscleGroups: muscleGroups,
      exerciseTypes: exerciseType,
    });
    return readExerciseDtoSchema.parse(exercise);
  }

  async findAll(filter: ExerciseFindAllFilterDto) {
    console.log(filter);
    const commonsFilter = getCommonsFilterValues(filter);
    const [exercisesEntities, count] =
      await this.exerciseRepository.findAndCount({
        ...commonsFilter,
        relations: {
          muscleGroups: true,
          exerciseTypes: true,
        },
        where: {
          ...commonsFilter.where,
          name: filter.name ? Like(`%${filter.name}%`) : undefined,
          description: filter.description
            ? Like(`%${filter.description}%`)
            : undefined,
          muscleGroups:
          filter.muscleGroups && filter.muscleGroups.length > 0 ? { id: In(filter.muscleGroups) } : undefined,
          exerciseTypes:
          filter.exerciseTypes && filter.exerciseTypes.length > 0 ? { id: In(filter.exerciseTypes) } : undefined,
        },
      });
    const exercises = exercisesEntities.map((exercise) =>
      readExerciseDtoSchema.parse(exercise),
    );
    return {
      values: exercises,
      total: count,
      skip: filter.skip,
      take: filter.take,
    };
  }

  async findOne(id: string) {
    const exercise = await this.exerciseRepository.findOne({
      where: { id },
      relations: {
        muscleGroups: true,
        exerciseTypes: true,
      },
    });
    return readExerciseWithRelatedDtoSchema.parse(exercise);
  }

  async update(id: string, dto: UpdateExerciseDto) {
    const muscleGroups = await this.muscleGroupRepository.findBy({
      id: In(dto.muscleGroups),
    });
    const exerciseType = await this.exerciseTypeRepository.findBy({
      id: In(dto.exerciseTypes),
    });
    const exercise = await this.exerciseRepository.save({
      id,
      ...dto,
      muscleGroups: muscleGroups,
      exerciseTypes: exerciseType,
    });
    return readExerciseDtoSchema.parse(exercise);
  }

  async remove(id: string) {
    await this.exerciseRepository.delete(id);
  }
}
