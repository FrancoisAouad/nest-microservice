import { Dialect } from 'sequelize';
console.log(process.env.DB_PORT);
// fix issue where the config values cannot be read
export default () => ({
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.APP_PORT || '3000',
    name: process.env.APP_NAME,
  },
  database: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_DATABASE,
    mongoose: {
      uri: process.env.DB_URI,
    },
    sequelize: {
      dialect: process.env.DB_DIALECT as Dialect,
      logging: Boolean(process.env.DB_LOGGING),
      autoLoadModels: Boolean(process.env.DB_AUTO_LOAD_MODELS) || true,
      synchronize: Boolean(process.env.DB_SYNCHRONIZE) || true,
    },
    typeorm: {},
    logger: {},
  },
  application_logging: {
    level: process.env.LOG_LEVEL || 'info',
    console: process.env.LOG_ENABLE_CONSOLE !== 'true',
    file: process.env.LOG_FILE || '',
  },
});
