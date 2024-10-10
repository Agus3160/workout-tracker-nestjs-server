import { BaseEntityUtil } from 'src/util/base/entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { Exercise } from './exercise.entity';

@Entity()
export class ExerciseType extends BaseEntityUtil {
  @Column({ unique: true, type: 'varchar', length: 64 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToMany(() => Exercise, (exercise) => exercise.exerciseTypes)
  exercises: Exercise[];
}
