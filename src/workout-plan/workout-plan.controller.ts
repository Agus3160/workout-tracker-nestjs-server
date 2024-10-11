import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  Query,
} from '@nestjs/common';
import { WorkoutPlanService } from './workout-plan.service';
import {
  CreateWorkOutPlanDto,
  createWorkOutPlanDtoSchema,
  updateWorkOutPlanDtoSchema,
  WorkOutPlanFindAllFilterDto,
  workOutPlanFindAllFilterDtoSchema,
} from './workout-plan.dto';
import { ZodValidationPipe } from 'src/util/pipe/zod-validation.pipe';

@Controller('workout-plan')
export class WorkoutPlanController {
  constructor(private readonly workoutService: WorkoutPlanService) {}

  @UsePipes(new ZodValidationPipe(createWorkOutPlanDtoSchema))
  @Post()
  create(@Body() createWorkoutDto: CreateWorkOutPlanDto) {
    return this.workoutService.create(createWorkoutDto);
  }

  @UsePipes(new ZodValidationPipe(workOutPlanFindAllFilterDtoSchema))
  @Get()
  findAll(@Query() filter: WorkOutPlanFindAllFilterDto) {
    return this.workoutService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(updateWorkOutPlanDtoSchema))
  update(@Param('id') id: string, @Body() updateWorkoutDto) {
    return this.workoutService.update(id, updateWorkoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutService.remove(id);
  }
}
