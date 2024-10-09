import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Query, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, createUserDtoSchema, UpdateUserDto, updateUserDtoSchema, UserFindAllFilterDto, userFindAllFilterDtoSchema } from './user.dto';
import { IdValidationPipe } from 'src/util/pipe/id-validation.pipe';
import { ZodValidationPipe } from 'src/util/pipe/zod-validation.pipe';
import { ResponseInterceptor } from 'src/util/interceptor/ResponseInterceptor';
import { ResponseMessage } from 'src/util/decorator/response-message.decorator';

@UseInterceptors(ResponseInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ResponseMessage('User was created successfully!')
  @Post()
  @UsePipes(new ZodValidationPipe(createUserDtoSchema))
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ResponseMessage('User was found!')
  @Get('/email/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

  @ResponseMessage('User was found!')
  @Get('/username/:username')
  findOneByUsername(@Param('username') username: string) {
    return this.userService.findOneByUsername(username);
  }

  @ResponseMessage('User was found!')
  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.userService.findOne(id);
  }

  @ResponseMessage('User was updated successfully!')
  @Patch(':id')
  @UsePipes(new ZodValidationPipe(updateUserDtoSchema))
  update(@Param('id', IdValidationPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ResponseMessage('User was deleted successfully!')
  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.userService.remove(+id);
  }

  @ResponseMessage('Users were fetched successfully!')
  @Get()
  @UsePipes(new ZodValidationPipe(userFindAllFilterDtoSchema))
  findAll(@Query() filter: UserFindAllFilterDto) {
    return this.userService.findAll(filter);
  }

}
