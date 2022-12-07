import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  StreamableFile,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  result: T;
}

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, Response<T> | StreamableFile>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<any> | StreamableFile> {
    return next.handle().pipe(
      map((result) => {
        if (result instanceof StreamableFile) {
          return result;
        }
        console.log('dara resources',result)

        return result
      }),
    );
  }
}
