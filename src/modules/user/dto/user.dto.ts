import {
  IsBoolean,
  IsEmpty,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNotIn,
  IsNumber,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { WearDto } from './wear.dto';
import { plainToClass, Type } from 'class-transformer';

export class UserDto {
  @ApiProperty({
    title: '名称',
    description: '用户名称',
    example: '张三',
  })
  @IsNotEmpty({
    message: '用户名不能为空',
    context: { errorCode: ApiErrorCode.NOT_EMPTY },
  })
  @MaxLength(10, {
    message: '名字不能超过10个字符',
    context: { errorCode: ApiErrorCode.STRING_TOO_LONG },
  })
  readonly name: string;

  @ApiProperty({
    title: '性别',
    description: '0=女,1=男,-1=其他',
    example: 1,
  })
  @IsIn([0, 1, -1], {
    message: '性别只能为:0, 1, -1',
    context: { errorCode: ApiErrorCode.PARAM_ERROR },
  })
  readonly sex: number;

  @ApiProperty({
    title: '年龄',
    description: '年龄范围：0~200',
    example: 18,
  })
  /*   @IsInt({
    message: '年龄只能为整数',
    context: { errorCode: ApiErrorCode.FAIL },
  }) */
  /*   @IsNumber(
    {},
    {
      message: '年龄只能为整数',
      context: { errorCode: ApiErrorCode.FAIL },
    },
  ) */
  @Min(0, {
    message: '年龄不能小于0',
    context: { errorCode: ApiErrorCode.PARAM_ERROR },
  })
  @Max(200, {
    message: '年龄不能大于200',
    context: { errorCode: ApiErrorCode.PARAM_ERROR },
  })
  readonly age: number;

  @ApiProperty({
    required: false,
    title: '孩子',
    description: '格式:[{name:"小花",sex:0,age:18}]',
    example: [{ name: '小花', sex: 0, age: 18, wear: {} }],
  })
  readonly children: UserDto[];

  @ApiProperty({
    required: false,
    title: '穿着',
    description: 'hat=帽子，clothes=上衣，trousers=裤子，shoes=鞋子',
    example: WearDto,
  })
  @Type(() => WearDto)
  @ValidateNested({
    message: 'wear 报错',
    context: { errorCode: ApiErrorCode.PARAM_ERROR },
  })
  readonly wear: WearDto;

  @ApiProperty({
    required: false,
    title: '是否已激活',
    description: '是否已激活',
    example: false,
  })
  @IsBoolean({
    message: '激活只能为bool类型',
    context: { errorCode: ApiErrorCode.PARAM_ERROR },
  })
  readonly active: boolean;

  @ApiProperty({
    required: false,
    title: '备注（选填）',
    description: '无',
    example: '无',
  })
  @MaxLength(100, {
    message: '备注不能超过100个字符长度',
  })
  readonly remark: string;
}
