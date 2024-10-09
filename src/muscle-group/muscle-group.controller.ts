import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MuscleGroupService } from './muscle-group.service';
import { CreateMuscleGroupDto, MuscleGroupFindAllFilterDto, UpdateMuscleGroupDto } from './muscle-group.dto';
import { ResponseMessage } from 'src/util/decorator/response-message.decorator';

@Controller('muscle-group')
export class MuscleGroupController {
  
  constructor(private readonly muscleGroupService: MuscleGroupService) {}

  @ResponseMessage('MuscleGroup was created successfully')
  @Post()
  create(@Body() createMuscleGroupDto: CreateMuscleGroupDto) {
    return this.muscleGroupService.create(createMuscleGroupDto);
  }

  @ResponseMessage('MuscleGroup found')
  @Get()
  findAll(@Query() filter:MuscleGroupFindAllFilterDto) {
    return this.muscleGroupService.findAll(filter);
  }

  @ResponseMessage('MuscleGroup found')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.muscleGroupService.findOne(id);
  }

  @ResponseMessage('MuscleGroup was updated successfully')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMuscleGroupDto: UpdateMuscleGroupDto) {
    return this.muscleGroupService.update(id, updateMuscleGroupDto);
  }

  @ResponseMessage('MuscleGroup was removed successfully')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.muscleGroupService.remove(+id);
  }
}
