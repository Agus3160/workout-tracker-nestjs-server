import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { z, ZodError } from 'zod';

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(value: any) {
    const parsed = z.string().uuid().parse(value);
    return parsed;
  }
}
