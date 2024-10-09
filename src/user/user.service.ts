import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateUserDto,
  ReadUserDto,
  readUserDtoSchema,
  UpdateUserDto,
  UserFindAllFilterDto,
} from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Like, Repository } from 'typeorm';
import { getCommonsFilterValues } from 'src/util/util';
import { PaginationResponseType } from 'src/util/base/type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ReadUserDto> {
    const user = this.userRepo.create(createUserDto);
    const result = await this.userRepo.save(user);
    return readUserDtoSchema.parse(result);
  }

  async findOne(id: string): Promise<ReadUserDto> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return readUserDtoSchema.parse(user);
  }

  async findOneByEmail(email: string): Promise<ReadUserDto> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new NotFoundException('User not found');
    return readUserDtoSchema.parse(user);
  }

  async findOneByUsername(username: string): Promise<ReadUserDto> {
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user) throw new NotFoundException('User not found');
    return readUserDtoSchema.parse(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    await this.userRepo.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }

  //TODO
  async findAll(filter: UserFindAllFilterDto):Promise<PaginationResponseType<ReadUserDto>> {
    const { email, username, role, ...baseFilter } = filter;
    const commonsFilter = getCommonsFilterValues(baseFilter);
    const [usersEntities, count] = await this.userRepo.findAndCount({
      ...commonsFilter,
      where: {
        ...commonsFilter.where,
        email: email ? Like(`%${filter.email}%`) : undefined,
        username: username ? Like(`%${filter.username}%`) : undefined,
        role: role ? role : undefined,
      },
    });
    const user = usersEntities.map((user) => readUserDtoSchema.parse(user));
    return {
      values: user,
      total: count,
      skip: baseFilter.skip,
      take: baseFilter.take
    }
  }
}
