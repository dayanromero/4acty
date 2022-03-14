import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  export interface Response<T> {
      ok: Boolean;
      message: string;
      data: T;
      aditional: T;
  }
  // code: context.switchToHttp().getResponse().statusCode,
  // status: data.status
  @Injectable()
  export class TransformInterceptor<T>
    implements NestInterceptor<T, Response<T>> {
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<Response<T>> {
      return next
        .handle()
        .pipe(
          map((data) => ({
            ok:true,
            message: data.message,
            data:data.data,
            aditional:data.aditional
          })),
        );
    }
  }
