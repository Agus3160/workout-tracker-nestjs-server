import { Injectable } from '@nestjs/common';
import { CreateExerciseTypeDto } from './dto/create-exercise-type.dto';
import { UpdateExerciseTypeDto } from './dto/update-exercise-type.dto';

@Injectable()
export class ExerciseTypeService {
  create(createExerciseTypeDto: CreateExerciseTypeDto) {
    return 'This action adds a new exerciseType';
  }

  findAll() {
    return `This action returns all exerciseType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exerciseType`;
  }

  update(id: number, updateExerciseTypeDto: UpdateExerciseTypeDto) {
    return `This action updates a #${id} exerciseType`;
  }

  remove(id: number) {
    return `This action removes a #${id} exerciseType`;
  }
}
