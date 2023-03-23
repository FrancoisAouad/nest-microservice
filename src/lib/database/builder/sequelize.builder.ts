import { ConfigService } from '@nestjs/config';
import { Dialect } from 'sequelize';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

export class SequelizeBuilder implements SequelizeModuleOptions {
  dialect: Dialect;
  host: string;
  port?: number;
  username?: string;
  password?: string;
  database: string;
  logging?: boolean;
  autoLoadModels?: boolean;
  synchronize?: boolean;

  constructor(config: ConfigService) {
    this.dialect = config.get<Dialect>('database.dialect');
    this.host = config.get<string>('database.host');
    this.port = config.get<number>('database.port');
    this.username = config.get<string>('database.user');
    this.password = config.get<string>('database.password');
    this.database = config.get<string>('database.database');
  }
  setDialect(dialect: Dialect): SequelizeBuilder {
    this.dialect = dialect;
    return this;
  }
  setHost(host: string): SequelizeBuilder {
    this.host = host;
    return this;
  }

  setPort(port: number): SequelizeBuilder {
    this.port = port;
    return this;
  }

  setUsername(username: string): SequelizeBuilder {
    this.username = username;
    return this;
  }

  setPassword(password: string): SequelizeBuilder {
    this.password = password;
    return this;
  }

  setDatabase(database: string): SequelizeBuilder {
    this.database = database;
    return this;
  }

  enableLogging(logging: boolean): SequelizeBuilder {
    this.logging = logging;
    return this;
  }

  enableAutoLoadModels(autoLoadModels: boolean): SequelizeBuilder {
    this.autoLoadModels = autoLoadModels;
    return this;
  }

  enableSynchronize(synchronize: boolean): SequelizeBuilder {
    this.synchronize = synchronize;
    return this;
  }

  build(): SequelizeModuleOptions {
    return {
      dialect: this.dialect,
      host: this.host,
      port: this.port,
      username: this.username,
      password: this.password,
      database: this.database,
      logging: this.logging,
      autoLoadModels: this.autoLoadModels,
      synchronize: this.synchronize,
    };
  }
}
