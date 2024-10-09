import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpAuthSchema, SignUpAuthDto } from './dto/signup-auth.dto';
import { ZodValidationPipe } from 'src/util/pipe/zod-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(signUpAuthSchema))
  signup(@Body() data: SignUpAuthDto) {
  }

  @Post()
  login() {
  }

}
