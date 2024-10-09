import { Injectable } from '@nestjs/common';
import { CreateUserDto, ReadUserDto, readUserDtoSchema, UpdateUserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

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

  async findOne(id: string):Promise<ReadUserDto> {
    const user = await this.userRepo.findOne({ where: { id } });
    return readUserDtoSchema.parse(user);
  }

  async findOneByEmail(email: string):Promise<ReadUserDto> {
    const user = await this.userRepo.findOne({ where: { email } });
    return readUserDtoSchema.parse(user);
  }

  async findOneByUsername(username: string):Promise<ReadUserDto> {
    const user = await this.userRepo.findOne({ where: { username } });
    return readUserDtoSchema.parse(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto):Promise<void> {
    await this.userRepo.update(id, updateUserDto);
  }

  async remove(id: number):Promise<void> {
    await this.userRepo.delete(id);
  }

  //TODO
  findAll() {
    return `This action returns all user`;
  }
}
