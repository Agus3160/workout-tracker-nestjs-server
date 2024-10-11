import { Module } from '@nestjs/common';
import { WorkoutDetailService } from './workout-detail.service';
import { WorkoutDetailController } from './workout-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutDetail } from 'src/entities/workout-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutDetail])],
  controllers: [WorkoutDetailController],
  providers: [WorkoutDetailService],
})
export class WorkoutDetailModule {}
