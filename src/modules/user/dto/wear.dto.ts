import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmpty, IsNotEmpty, IsString } from 'class-validator';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';

export class WearDto {
  @ApiProperty({
    title: '帽子',
    description: '帽子',
    example: 'mlb',
  })
  @IsString({
    message: 'hat为字符串',
    context: { errorCode: ApiErrorCode.PARAM_ERROR },
  })
  readonly hat: string;

  @ApiProperty({
    title: '衣服',
    description: '字符串或者字符串数组',
    example: '优衣库',
    examples: ['优衣库'],
  })
  readonly clothes: string | string[];

  @ApiProperty({
    title: '裤子',
    description: '裤子',
    example: '优衣库',
  })
  readonly trousers: string;

  @ApiProperty({
    title: '鞋子',
    description: '鞋子',
    example: 'adidas',
  })
  readonly shoes: string;
}
