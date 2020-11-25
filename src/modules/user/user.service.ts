import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { ApiException } from 'src/filters/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  /**
   * 分页查询
   */
  async queryUserList(param) {
    const { pageSize = 10, pageIndex, keyword = '' } = param;
    const _pageSize = parseInt(pageSize),
      _pageIndex = parseInt(pageIndex);
    const sort = { createTime: -1 }; // 排序
    const query = keyword ? { title: { $regex: keyword } } : {};
    const totalCount = await this.userModel.countDocuments(query);
    const pageData = await this.userModel
      .find(query)
      .skip(_pageSize * ((_pageIndex || 1) - 1))
      .limit(_pageSize)
      .sort(sort);
    return {
      totalCount,
      pageData,
    };
  }

  /**
   * 精确查询
   */
  async queryUserById(id: string) {
    const ret = await this.userModel.findOne({ _id: id }).exec();
    return ret;
  }

  /**
   * 新增
   */
  async create(userDto: UserDto) {
    const createUser = this.userModel(userDto);
    return createUser.save();
  }

  /**
   * 修改
   */
  async update(user) {
    const thisOne = await this.userModel.findOne({ _id: user.id });
    if (thisOne) {
      Object.assign(thisOne, user);
      const createUser = this.userModel(thisOne);
      return createUser.save();
    } else {
      throw new ApiException(
        '修改失败，没有找到这条记录',
        ApiErrorCode.NOT_EMPTY,
        HttpStatus.OK,
      );
    }
  }

  /**
   * 根据id物理删除记录（支持单条删除或者批量删除）
   * @param id 记录的id，例如："5f8d60b51e504746dc132450"
   */
  async delete(id: string) {
    const thisOne = await this.userModel.findOne({ _id: id });
    if (thisOne) {
      return this.userModel.deleteOne({
        _id: id,
      });
    } else {
      throw new ApiException(
        '删除失败，没有找到这条记录',
        ApiErrorCode.NOT_EMPTY,
        HttpStatus.OK,
      );
    }
  }

  /**
   * 根据id物理删除记录（支持单条删除或者批量删除）
   * @param id 记录的id数组，多条：["5f8d60b51e504746dc132450","5f8d60d11e504746dc132451"...]
   *
   */
  async bulkDelete(id: string[]) {
    try {
      return this.userModel.deleteMany({
        _id: { $in: id },
      });
    } catch (err) {
      throw new ApiException(
        `批量删除失败:[${err.message}]`,
        ApiErrorCode.NOT_EMPTY,
        HttpStatus.OK,
      );
    }
  }
}
