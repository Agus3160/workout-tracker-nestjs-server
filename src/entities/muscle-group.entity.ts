import { BaseEntityUtil } from "src/util/base/entity";
import { Column, Entity } from "typeorm";

@Entity()
export class MuscleGroup extends BaseEntityUtil {

  @Column({unique: true, type: 'varchar', length: 64})
  name: string

  @Column({type: 'text'})
  description: string

}
