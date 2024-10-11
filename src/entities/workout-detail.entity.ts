import { BaseEntityUtil } from 'src/util/base/entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Exercise } from './exercise.entity';
import { WorkoutPlan } from './workout-plan.entity';

export enum WeekDayEnum {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
}

@Entity()
export class WorkoutDetail extends BaseEntityUtil {
  @Column({ type: 'integer', nullable: true })
  sets: number;

  @Column({ type: 'integer', nullable: true })
  reps: number;

  @Column({ type: 'integer', nullable: true })
  weigth: number;

  @Column({ type: 'integer', nullable: true })
  restTimeSec: number;

  @Column({ type: 'integer' })
  week: number;

  @Column({ enum: WeekDayEnum })
  day: WeekDayEnum;

  @ManyToOne(() => Exercise, (exercise) => exercise.workoutDetails, {
    nullable: false,
  })
  exercise: Exercise;

  @ManyToOne(() => WorkoutPlan, (workout) => workout.workoutDetails, {
    nullable: false,
  })
  workoutPlan: WorkoutPlan;
}
