import { Injectable } from '@nestjs/common';
import {
  CreateExerciseTypeDto,
  ExerciseTypeFindAllFilterDto,
  readExerciseTypeDtoSchema,
  UpdateExerciseTypeDto,
} from './exercise-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseType } from 'src/entities/exercise-type.entity';
import { Like, Repository } from 'typeorm';
import { getCommonsFilterValues } from 'src/util/util';

@Injectable()
export class ExerciseTypeService {
  constructor(
    @InjectRepository(ExerciseType)
    private exerciseTypeRepository: Repository<ExerciseType>,
  ) {}

  async create(dto: CreateExerciseTypeDto) {
    const exerciseType = await this.exerciseTypeRepository.save(dto);
    return readExerciseTypeDtoSchema.parse(exerciseType);
  }

  async findAll(filter: ExerciseTypeFindAllFilterDto) {
    const { name, description, ...baseFilter } = filter;
    const commonsFilter = getCommonsFilterValues(baseFilter);
    const [exerciseTypesEntities, count] =
      await this.exerciseTypeRepository.findAndCount({
        ...commonsFilter,
        where: {
          ...commonsFilter.where,
          name: name ? Like(`%${filter.name}%`) : undefined,
          description: description
            ? Like(`%${filter.description}%`)
            : undefined,
        },
      });
    const exerciseType = exerciseTypesEntities.map((exerciseType) =>
      readExerciseTypeDtoSchema.parse(exerciseType),
    );
    return {
      values: exerciseType,
      total: count,
      skip: baseFilter.skip,
      take: baseFilter.take,
    };
  }

  async findOne(id: string) {
    const exerciseType = await this.exerciseTypeRepository.findOne({
      where: { id },
    });
    return readExerciseTypeDtoSchema.parse(exerciseType);
  }

  async update(id: string, updateExerciseTypeDto: UpdateExerciseTypeDto) {
    const exerciseType = await this.exerciseTypeRepository.save({
      id,
      ...updateExerciseTypeDto,
    });
    return readExerciseTypeDtoSchema.parse(exerciseType);
  }

  async remove(id: string) {
    await this.exerciseTypeRepository.delete(id);
  }
}
