import { PipeTransform, Injectable, HttpStatus } from '@nestjs/common';
import { ApiException } from 'src/filters/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';

@Injectable()
export class ParseObjectIDPipe implements PipeTransform {
  transform(value: string) {
    // 5f05398afd7ee76888ef5414
    if (!/^[a-fA-F0-9]{24}$/.test(value)) {
      throw new ApiException(
        'id格式错误',
        ApiErrorCode.IS_NOT_OBJECTID_STRING,
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}

@Injectable()
export class IsObjectIdArrayPipe implements PipeTransform {
  transform(value: string[]) {
    // ['num1','num2']
    if (!value.length) {
      throw new ApiException(
        '参数长度不能为空',
        ApiErrorCode.PARAM_ERROR,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      for (let i = 0, count = value.length; i < count; i++) {
        const temp = value[i];
        const val = /^[a-fA-F0-9]{24}$/.test(temp);
        if (!val) {
          throw new ApiException(
            `参数第${i + 1}项格式错误`,
            ApiErrorCode.PARAM_ERROR,
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    }
    return value;
  }
}
