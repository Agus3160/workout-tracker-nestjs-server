import { User } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';
import { UserRolesEnum } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';

export async function seedData(dataSource: DataSource): Promise<void> {

  //REPOSITORIES
  const userRepo = dataSource.getRepository(User);

  //DATA
  const usersData = [
    {
      username: 'admin',
      email: 'admin@localhost.com',
      password: await bcrypt.hash('12345678',10),
      role: UserRolesEnum.ADMIN
    },
    {
      username: 'user',
      email: 'user@localhost.com',
      password: await bcrypt.hash('12345678',10),
      role: UserRolesEnum.USER
    }
  ] 

  //SEED DATA
  for (const user of usersData) {
    await userRepo.save(user);
  }

}