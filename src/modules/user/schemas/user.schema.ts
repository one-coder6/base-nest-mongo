// 使用装饰器
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime',
  },
})
export class User extends Document {
  @Prop()
  public name: string;

  @Prop()
  public sex: number;

  @Prop()
  public age: number;

  @Prop()
  public children: object[];

  @Prop()
  public wear: object;

  @Prop()
  public active: boolean;

  @Prop()
  public remark: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
