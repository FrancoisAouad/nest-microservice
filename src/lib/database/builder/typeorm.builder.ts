import { DatabaseType } from 'typeorm';
import { ConfigService } from '@nestjs/config';

type DatabaseOptions = { encrypt: boolean };
export class TypeORMBuilder {
  type: DatabaseType;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
  options: DatabaseOptions;

  constructor(config: ConfigService) {
    this.type = config.get<DatabaseType>('database.type');
    this.host = config.get<string>('database.host');
    this.port = config.get<number>('database.port');
    this.username = config.get<string>('database.username');
    this.password = config.get<string>('database.password');
    this.database = config.get<string>('database.database');
    this.synchronize = config.get<boolean>('database.synchronize');
    this.logging = config.get<boolean>('database.logging');
    this.options = config.get<DatabaseOptions>('database.options');
  }
  setType(type: DatabaseType): TypeORMBuilder {
    this.type = type;
    return this;
  }
  setUsername(username: string): TypeORMBuilder {
    this.username = username;
    return this;
  }
  setHost(host: string): TypeORMBuilder {
    this.host = host;
    return this;
  }
  setPort(port: number): TypeORMBuilder {
    this.port = port;
    return this;
  }

  setPassword(password: string): TypeORMBuilder {
    this.password = password;
    return this;
  }
  setDatabase(database: string): TypeORMBuilder {
    this.database = database;
    return this;
  }

  enableSynchronize(synchronize: boolean): TypeORMBuilder {
    this.synchronize = synchronize;
    return this;
  }

  enableLogging(logging: boolean): TypeORMBuilder {
    this.logging = logging;
    return this;
  }

  setOptions(options: DatabaseOptions): TypeORMBuilder {
    this.options = options;
    return this;
  }
  build(): any {
    return {
      type: this.type,
      host: this.host,
      port: this.port,
      username: this.username,
      password: this.password,
      database: this.database,
      synchronize: this.synchronize,
      logging: this.logging,
      options: this.options,
    };
  }
}
