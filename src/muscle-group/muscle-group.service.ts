import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateMuscleGroupDto,
  MuscleGroupFindAllFilterDto,
  ReadMuscleGroupDto,
  readMuscleGroupDtoSchema,
  UpdateMuscleGroupDto,
} from './muscle-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MuscleGroup } from 'src/entities/muscle-group.entity';
import { Like, Repository } from 'typeorm';
import { PaginationResponseType } from 'src/util/base/type';
import { getCommonsFilterValues } from 'src/util/util';

@Injectable()
export class MuscleGroupService {
  constructor(
    @InjectRepository(MuscleGroup)
    private readonly muscleGroupRepo: Repository<MuscleGroup>,
  ) {}

  async create(dto: CreateMuscleGroupDto): Promise<ReadMuscleGroupDto> {
    const muscleGroup = await this.muscleGroupRepo.save(
      this.muscleGroupRepo.create(dto),
    );
    return readMuscleGroupDtoSchema.parse(muscleGroup);
  }

  async findAll(
    filter: MuscleGroupFindAllFilterDto,
  ): Promise<PaginationResponseType<ReadMuscleGroupDto>> {
    const { name, description, ...baseFilter } = filter;
    const commonsFilter = getCommonsFilterValues(baseFilter);
    const [muscleGroupsEntities, count] = await this.muscleGroupRepo.findAndCount(
      {
        ...commonsFilter,
        where: {
          ...commonsFilter.where,
          name: name ? Like(`%${filter.name}%`) : undefined,
          description: description
            ? Like(`%${filter.description}%`)
            : undefined,
        },
      },
    );
    const muscleGroup = muscleGroupsEntities.map((muscleGroup) =>
      readMuscleGroupDtoSchema.parse(muscleGroup),
    );
    return {
      values: muscleGroup,
      total: count,
      skip: baseFilter.skip,
      take: baseFilter.take,
    };
  }

  async findOne(id: string): Promise<ReadMuscleGroupDto> {
    const muscleGroup = await this.muscleGroupRepo.findOne({ where: { id } });
    if (!muscleGroup) throw new NotFoundException('MuscleGroup not found');
    return readMuscleGroupDtoSchema.parse(muscleGroup);
  }

  async update(
    id: string,
    dto: UpdateMuscleGroupDto,
  ): Promise<ReadMuscleGroupDto> {
    const muscleGroup = await this.muscleGroupRepo.save({ id, ...dto });
    if (!muscleGroup) throw new NotFoundException('MuscleGroup not found');
    return readMuscleGroupDtoSchema.parse(muscleGroup);
  }

  async remove(id: number): Promise<void> {
    await this.muscleGroupRepo.delete(id);
  }
}
