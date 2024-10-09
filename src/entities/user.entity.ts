import { BaseEntityUtil } from 'src/util/base/entity';
import { Entity, Column } from 'typeorm';

export const userRoles = ['USER', 'ADMIN'] as const;
export enum UserRolesEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Entity()
export class User extends BaseEntityUtil {
  @Column({ unique: true, type: 'varchar', length: 32 })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: userRoles, default: 'USER' })
  role: string;

  @Column()
  password: string;
}