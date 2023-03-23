import { Dialect } from 'sequelize';
export default () => ({
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.APP_PORT || '3000',
    name: process.env.APP_NAME || 'Prototype Application',
  },
  database: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '000000',
    name: process.env.DB_DATABASE || 'postgres',
    mongoose: {
      uri: process.env.DB_URI,
    },
    sequelize: {
      dialect: (process.env.DB_DIALECT as Dialect) || ('postgres' as Dialect),
      logging: Boolean(process.env.DB_LOGGING) || false,
      autoLoadModels: Boolean(process.env.DB_AUTO_LOAD_MODELS) || true,
      synchronize: Boolean(process.env.SYNCHRONIZE) || true,
    },
    typeorm: {},
    logger: {},
  },
});
