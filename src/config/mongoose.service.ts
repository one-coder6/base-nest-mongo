import { ConfigService } from './config.service';
import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createMongooseOptions(): MongooseModuleOptions {
    const target = [
      'mongo.host',
      'mongo.db',
      'mongo.username',
      'mongo.password',
    ];
    const [host, dbName, username, password] = this.configService.gets(target);
    const url = global.isDev
      ? 'localhost:27017'
      : `${username}:${password}@${host}`;
    const db: MongooseModuleOptions = {
      uri: `mongodb://${url}/${dbName}`,
    };
    console.log('db', db);
    return db;
  }
}
