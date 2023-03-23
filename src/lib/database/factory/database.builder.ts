// import { ConfigService } from '@nestjs/config';
// import { DatabaseConfig, MongooseORM, SequelizeORM } from './database.factory';

// // class DatabaseConfig {
// //   dialect: string;
// //   host: string;
// //   port: number;
// //   username: string;
// //   password: string;
// //   database: string;
// //   logging: boolean;
// //   autoLoadModels: boolean;
// //   synchronize: boolean;

// //   constructor(builder: DatabaseConfigBuilder) {
// //     this.dialect = builder.dialect;
// //     this.host = builder.host;
// //     this.port = builder.port;
// //     this.username = builder.username;
// //     this.password = builder.password;
// //     this.database = builder.database;
// //     this.logging = builder.logging;
// //     this.autoLoadModels = builder.autoLoadModels;
// //     this.synchronize = builder.synchronize;
// //   }
// // }

// // export class DatabaseConfigBuilder {
// //   dialect: string;
// //   host: string;
// //   port: number;
// //   username: string;
// //   password: string;
// //   database: string;
// //   logging = true;
// //   autoLoadModels = true;
// //   synchronize = false;

// //   constructor(config: ConfigService) {
// //     this.dialect = config.get<string>('database.dialect');
// //     this.host = config.get<string>('database.host');
// //     this.port = config.get<number>('database.port');
// //     this.username = config.get<string>('database.user');
// //     this.password = config.get<string>('database.password');
// //     this.database = config.get<string>('database.database');
// //   }

// //   withLogging(logging: boolean): DatabaseConfigBuilder {
// //     this.logging = logging;
// //     return this;
// //   }

// //   withAutoLoadModels(autoLoadModels: boolean): DatabaseConfigBuilder {
// //     this.autoLoadModels = autoLoadModels;
// //     return this;
// //   }

// //   withSynchronize(synchronize: boolean): DatabaseConfigBuilder {
// //     this.synchronize = synchronize;
// //     return this;
// //   }

// //   build(): DatabaseConfig {
// //     return new DatabaseConfig(this);
// //   }
// // }

// // export class PostgreSQLConfigBuilder extends DatabaseConfigBuilder {
// //   constructor() {
// //     super();
// //   }
// // }
// /////////
// class PostgreSQLConfig extends DatabaseConfig {
//   private orm: SequelizeORM;

//   constructor(builder: PostgreSQLConfigBuilder, orm: SequelizeORM) {
//     super(builder);
//     this.orm = orm;
//   }

//   async connect(): Promise<void> {
//     await this.orm.connect();
//   }

//   async close(): Promise<void> {
//     await this.orm.close();
//   }
// }

// class MongoDBConfig extends DatabaseConfig {
//   private orm: MongooseORM;

//   constructor(builder: MongoDBConfigBuilder, orm: MongooseORM) {
//     super(builder);
//     this.orm = orm;
//   }

//   async connect(): Promise<void> {
//     await this.orm.connect();
//   }

//   async close(): Promise<void> {
//     await this.orm.close();
//   }
// }

// class DatabaseConfigBuilder {
//   dialect: string;
//   host: string;
//   port: number;
//   username: string;
//   password: string;
//   database: string;
//   logging = true;
//   autoLoadModels = true;
//   synchronize = false;

//   constructor(config: ConfigService) {
//     this.dialect = config.get<string>('database.dialect');
//     this.host = config.get<string>('database.host');
//     this.port = config.get<number>('database.port');
//     this.username = config.get<string>('database.user');
//     this.password = config.get<string>('database.password');
//     this.database = config.get<string>('database.database');
//   }

//   withLogging(logging: boolean): DatabaseConfigBuilder {
//     this.logging = logging;
//     return this;
//   }

//   withAutoLoadModels(autoLoadModels: boolean): DatabaseConfigBuilder {
//     this.autoLoadModels = autoLoadModels;
//     return this;
//   }

//   withSynchronize(synchronize: boolean): DatabaseConfigBuilder {
//     this.synchronize = synchronize;
//     return this;
//   }

//   buildSequelizeORM(): SequelizeORM {
//     const options: SequelizeOptions = {
//       dialect: this.dialect,
//       host: this.host,
//       port: this.port,
//       username: this.username,
//       password: this.password,
//       database: this.database,
//       logging: this.logging,
//     };
//     return new SequelizeORM(options);
//   }

//   buildMongooseORM(): MongooseORM {
//     const uri = `mongodb://${this.host}:${this.port}/${this.database}`;
//     const options: ConnectOptions = {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//     };
//     return new MongooseORM(uri, options);
//   }

//   buildPostgreSQLConfig(): PostgreSQLConfig {
//     const orm = this.buildSequelizeORM();
//     const builder = new PostgreSQLConfigBuilder(this);
//     return new PostgreSQLConfig(builder, orm);
//   }

//   buildMongoDBConfig(): MongoDBConfig {
//     const orm = this.buildMongooseORM();
//     const builder = new MongoDBConfigBuilder(this);
//     return new MongoDBConfig(builder, orm);
//   }

//   /**
//    * The withLogging, withAutoLoadModels, and withSynchronize methods allow you to set the corresponding properties on the DatabaseConfigBuilder instance and return the instance itself to enable method chaining.

//   The withSequelizeORM and withMongooseORM methods create instances of the SequelizeORM and MongooseORM classes, respectively, with the provided options and return instances of the PostgreSQLConfig and MongoDBConfig classes, respectively, that are constructed with the DatabaseConfigBuilder instance and the ORM instance.

//   The build method determines whether to use Sequelize or Mongoose based on the dialect property of the DatabaseConfigBuilder instance, creates an ORM instance with the withSequelizeORM or withMongooseORM method, and returns an instance of the PostgreSQLConfig or MongoDBConfig class with the ORM instance and the properties set on the builder instance.
//    */
// }
