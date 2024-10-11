import { Module } from '@nestjs/common';
import { WorkoutPlanService } from './workout-plan.service';
import { WorkoutPlanController } from './workout-plan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutPlan } from 'src/entities/workout-plan.entity';
import { WorkoutDetail } from 'src/entities/workout-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutPlan, WorkoutDetail])],
  controllers: [WorkoutPlanController],
  providers: [WorkoutPlanService],
})
export class WorkoutPlanModule {}
