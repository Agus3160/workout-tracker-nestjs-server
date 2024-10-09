import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, createUserDtoSchema, UpdateUserDto, updateUserDtoSchema } from './user.dto';
import { IdValidationPipe } from 'src/util/pipe/id-validation.pipe';
import { ZodValidationPipe } from 'src/util/pipe/zod-validation.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserDtoSchema))
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/email/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

  @Get('/username/:username')
  findOneByUsername(@Param('username') username: string) {
    return this.userService.findOneByUsername(username);
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(updateUserDtoSchema))
  update(@Param('id', IdValidationPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.userService.remove(+id);
  }


  @Get()
  findAll() {
    return this.userService.findAll();
  }

}
