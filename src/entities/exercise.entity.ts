import { BaseEntityUtil } from 'src/util/base/entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { ExerciseType } from './exercise-type.entity';
import { MuscleGroup } from './muscle-group.entity';

@Entity()
export class Exercise extends BaseEntityUtil {
  @Column({ unique: true, type: 'varchar', length: 64 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar' })
  imageUrl: string;

  @Column({ type: 'varchar' })
  tutorialUrl: string;

  @ManyToMany(() => ExerciseType, (exerciseType) => exerciseType.exercises)
  @JoinTable()
  exerciseTypes: ExerciseType[];

  @ManyToMany(() => MuscleGroup, (muscleGroup) => muscleGroup.exercises)
  @JoinTable()
  muscleGroups: MuscleGroup[];
} 
