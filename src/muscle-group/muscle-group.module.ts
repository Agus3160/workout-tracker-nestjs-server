import { Module } from '@nestjs/common';
import { MuscleGroupService } from './muscle-group.service';
import { MuscleGroupController } from './muscle-group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MuscleGroup } from 'src/entities/muscle-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MuscleGroup])],
  controllers: [MuscleGroupController],
  providers: [MuscleGroupService],
})
export class MuscleGroupModule {}
