import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { z, ZodError } from 'zod';

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(value: any) {
    const parsed = z.string().uuid().safeParse(value);
    if (!parsed.success) throw new ZodError(parsed.error.errors);
    return parsed.data;
  }
}
