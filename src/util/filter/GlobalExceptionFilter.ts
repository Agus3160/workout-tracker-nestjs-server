import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { ResponseType } from '../base/type';
import { ZodError } from 'zod';
import { EntityPropertyNotFoundError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // init exception response
    const exceptionResponse: ResponseType = {
      statusCode: 500,
      message: 'Internal server error',
      success: false,
      errors: [],
      data: null,
    };


    //Check type of exceptions
    if (exception instanceof HttpException) {
      exceptionResponse.statusCode = exception.getStatus();
      exceptionResponse.message = exception.message;
    }

    if (exception instanceof ZodError) {
      exceptionResponse.statusCode = 400;
      exceptionResponse.message = "Bad Request";
      const errors:string[] = exception.issues.map((issue) => {
        if(issue.path.length === 0) return issue.message
        return `${issue.path.join('.')}: ${issue.message}`;
      })
      exceptionResponse.errors = errors;
    }

    if(exception instanceof EntityPropertyNotFoundError){
      exceptionResponse.statusCode = 404;
      exceptionResponse.message = exception.message;
    }

    console.error(exception);

    //Send response
    response.status(exceptionResponse.statusCode).json(exceptionResponse);
  }
}
