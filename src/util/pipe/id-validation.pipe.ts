import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(value: any) {
    const parsed = z.string().uuid().safeParse(value);
    if (!parsed.success) {
      throw new BadRequestException('Invalid ID');
    }
    return parsed.data;
  }
}