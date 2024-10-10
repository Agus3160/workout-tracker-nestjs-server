import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from 'src/entities/exercise.entity';
import { MuscleGroup } from 'src/entities/muscle-group.entity';
import { ExerciseType } from 'src/entities/exercise-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise, MuscleGroup, ExerciseType])],
  controllers: [ExerciseController],
  providers: [ExerciseService],
})
export class ExerciseModule {}
