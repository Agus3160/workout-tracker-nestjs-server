import { BaseEntityUtil } from "src/util/base/entity";
import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import { WorkoutDetail } from "./workout-detail.entity";

@Entity()
export class WorkoutPlan extends BaseEntityUtil {

  @Column({ unique: true, type: 'varchar', length: 64 })
  name: string

  @Column({ type: 'text' })
  description: string

  @OneToMany(() => WorkoutDetail, workoutDetail => workoutDetail.workoutPlan)
  @JoinColumn()
  workoutDetails: WorkoutDetail[]

}
