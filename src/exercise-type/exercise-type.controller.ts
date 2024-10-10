import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { ExerciseTypeService } from './exercise-type.service';
import {
  CreateExerciseTypeDto,
  createExerciseTypeDtoSchema,
  ExerciseTypeFindAllFilterDto,
  UpdateExerciseTypeDto,
  updateExerciseTypeDtoSchema,
} from './exercise-type.dto';
import { ZodValidationPipe } from 'src/util/pipe/zod-validation.pipe';
import { ResponseInterceptor } from 'src/util/interceptor/ResponseInterceptor';
import { IdValidationPipe } from 'src/util/pipe/id-validation.pipe';
import { userFindAllFilterDtoSchema } from 'src/user/user.dto';

@UseInterceptors(ResponseInterceptor)
@Controller('exercise-type')
export class ExerciseTypeController {
  constructor(private readonly exerciseTypeService: ExerciseTypeService) {}

  @UsePipes(new ZodValidationPipe(createExerciseTypeDtoSchema))
  @Post()
  create(@Body() createExerciseTypeDto: CreateExerciseTypeDto) {
    return this.exerciseTypeService.create(createExerciseTypeDto);
  }

  @UsePipes(new ZodValidationPipe(userFindAllFilterDtoSchema))
  @Get()
  findAll(@Query() filter: ExerciseTypeFindAllFilterDto) {
    return this.exerciseTypeService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.exerciseTypeService.findOne(id);
  }

  @UsePipes(new ZodValidationPipe(updateExerciseTypeDtoSchema))
  @Patch(':id')
  update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateExerciseTypeDto: UpdateExerciseTypeDto,
  ) {
    return this.exerciseTypeService.update(id, updateExerciseTypeDto);
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.exerciseTypeService.remove(id);
  }
}
