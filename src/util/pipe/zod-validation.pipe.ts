import { Injectable, PipeTransform } from '@nestjs/common';
import { z } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: z.ZodSchema) {}
  transform(value: any) {
    const parsed = this.schema.parse(value);
    return parsed;
  }
}
