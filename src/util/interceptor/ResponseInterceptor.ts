import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResponseType } from '../base/type';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next
      .handle()
      .pipe(map((res: unknown) => this.responseHandler(res, context)));
  }

  responseHandler(res: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const statusCode = response.statusCode;

    const message =
      this.reflector.get<string>('responseMessage', context.getHandler()) ||
      'Operation success';

    const responseData: ResponseType<any> = {
      statusCode,
      success:true,
      message: message,
      errors: null,
      data: res,
    };

    return responseData;
  }
}
