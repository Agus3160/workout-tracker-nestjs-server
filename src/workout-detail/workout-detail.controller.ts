import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { WorkoutDetailService } from './workout-detail.service';
import {
  CreateWorkoutDetailDto,
  createWorkoutDetailDtoSchema,
  updateWorkoutDetailDtoSchema,
  WorkoutDetailFindAllFilterDto,
  workoutDetailFindAllFilterDtoSchema,
} from './workout-detail.dto';
import { ZodValidationPipe } from 'src/util/pipe/zod-validation.pipe';

@Controller('workout-detail')
export class WorkoutDetailController {
  constructor(private readonly workoutDetailService: WorkoutDetailService) {}

  @UsePipes(new ZodValidationPipe(createWorkoutDetailDtoSchema))
  @Post()
  create(@Body() createWorkoutDetailDto: CreateWorkoutDetailDto) {
    return this.workoutDetailService.create(createWorkoutDetailDto);
  }

  @UsePipes(new ZodValidationPipe(workoutDetailFindAllFilterDtoSchema))
  @Get()
  findAll(filter: WorkoutDetailFindAllFilterDto) {
    return this.workoutDetailService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutDetailService.findOne(id);
  }

  @UsePipes(new ZodValidationPipe(updateWorkoutDetailDtoSchema))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkoutDetailDto) {
    return this.workoutDetailService.update(id, updateWorkoutDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutDetailService.remove(id);
  }
}
