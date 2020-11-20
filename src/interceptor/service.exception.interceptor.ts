import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { ApiException } from 'src/filters/api.exception';

// 拦截抛出系统出现未知异常
@Injectable()
export class ServiceExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        console.log(error.stack);
        throw new ApiException(error.message, ApiErrorCode.FAIL, HttpStatus.OK);
      }),
    );
  }
}
