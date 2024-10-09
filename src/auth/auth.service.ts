import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async signup(credentials:SignUpAuthDto) {
    const user = this.userRepo.create(credentials);
    const password = credentials.password;
    await this.userRepo.save(user);
    return user;
  }


}
