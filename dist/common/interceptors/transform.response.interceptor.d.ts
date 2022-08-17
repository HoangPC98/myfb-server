import { NestInterceptor, ExecutionContext, CallHandler, StreamableFile } from '@nestjs/common';
import { Observable } from 'rxjs';
export interface Response<T> {
    statusCode: number;
    data: T;
}
export declare class TransformResponseInterceptor<T> implements NestInterceptor<T, Response<T> | StreamableFile> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<any> | StreamableFile>;
}
