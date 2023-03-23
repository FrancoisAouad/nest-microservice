import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export class MongooseBuilder implements MongooseModuleOptions {
  uri: string;
  dbName: string;
  user?: string;
  pass?: string;
  authSource?: string;
  replicaSet?: string;
  tls?: boolean;
  tlsCAFile?: string;
  tlsCertificateKeyFile?: string;
  useNewUrlParser?: boolean;

  constructor(config: ConfigService) {
    this.uri = config.get<string>('database.uri');
    this.dbName = config.get<string>('database.name');
    this.user = config.get<string>('database.username');
    this.pass = config.get<string>('database.password');
    this.authSource = config.get<string>('database.authSource');
    this.replicaSet = config.get<string>('database.replicaSet');
    this.tls = config.get<boolean>('database.tls');
    this.tlsCAFile = config.get<string>('database.tlsCAFile');
    this.tlsCertificateKeyFile = config.get<string>('database.tlsCertificateKeyFile');
    this.useNewUrlParser = config.get<boolean>('database.useNewUrlParser');
  }
  setUri(uri: string): MongooseBuilder {
    this.uri = uri;
    return this;
  }

  setDatabase(database: string): MongooseBuilder {
    this.dbName = database;
    return this;
  }

  setUsername(username: string): MongooseBuilder {
    this.user = username;
    return this;
  }

  setPassword(password: string): MongooseBuilder {
    this.pass = password;
    return this;
  }
  setAuthSource(authSource: string): MongooseBuilder {
    this.authSource = authSource;
    return this;
  }

  setReplicaSet(replicaSet: string): MongooseBuilder {
    this.replicaSet = replicaSet;
    return this;
  }

  enableTls(tls: boolean): MongooseBuilder {
    this.tls = tls;
    return this;
  }

  setTlsCAFile(tlsCAFile: string): MongooseBuilder {
    this.tlsCAFile = tlsCAFile;
    return this;
  }
  setTlsCertificateKeyFile(tlsCertificateKeyFile: string): MongooseBuilder {
    this.tlsCertificateKeyFile = tlsCertificateKeyFile;
    return this;
  }

  enableNewUrlParser(urlParser: boolean): MongooseBuilder {
    this.useNewUrlParser = urlParser;
    return this;
  }

  build(): MongooseModuleOptions {
    return {
      uri: this.uri,
      dbName: this.dbName,
      user: this.user,
      pass: this.pass,
      authSource: this.authSource,
      replicaSet: this.replicaSet,
      tls: this.tls,
      tlsCAFile: this.tlsCAFile,
      tlsCertificateKeyFile: this.tlsCertificateKeyFile,
      useNewUrlParser: this.useNewUrlParser,
    };
  }
}
