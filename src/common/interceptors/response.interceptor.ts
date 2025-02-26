// src/common/interceptors/response.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ResponseDto } from '../DTO/response/response.dto';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const { message, ...rest } = data;
        const responseMessage = message ? message : 'operation successful';
        return new ResponseDto(HttpStatus.OK, rest, responseMessage);
      }),
      catchError((error) => {
        let statusCode = error?.status || HttpStatus.INTERNAL_SERVER_ERROR;
        let errorMessage =
          error?.response?.message || error?.message || 'An error occurred';
        let errorData = error?.response?.data || null;
        throw new HttpException(
          of(
            new ResponseDto(
              statusCode,
              errorData,
              errorMessage,
              error?.response?.error,
            ),
          ),
          statusCode,
        );
      }),
    );
  }
}
