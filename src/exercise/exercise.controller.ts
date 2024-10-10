import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseFindAllFilterDto, exerciseFindAllFilterDtoSchema } from './exercise.dto';
import { ZodValidationPipe } from 'src/util/pipe/zod-validation.pipe';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post()
  create(@Body() createExerciseDto) {
    return this.exerciseService.create(createExerciseDto);
  }

  @Get()
  @UsePipes(new ZodValidationPipe(exerciseFindAllFilterDtoSchema))
  findAll(@Query() filter:ExerciseFindAllFilterDto) {
    return this.exerciseService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exerciseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExerciseDto) {
    return this.exerciseService.update(id, updateExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exerciseService.remove(id);
  }
}
