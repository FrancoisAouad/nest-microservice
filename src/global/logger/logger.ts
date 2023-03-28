import { LoggerOptions, createLogger, transports } from 'winston';
import config from 'src/configs/config';
/* eslint-disable @typescript-eslint/no-var-requires */
const ecsFormat = require('@elastic/ecs-winston-format');

export class Logger {
  private loggerInstance: ReturnType<typeof createLogger>;
  private options: LoggerOptions = {
    format: ecsFormat(),
    transports: Logger.createTransport(),
  };

  constructor() {
    this.loggerInstance = createLogger(this.options);
  }

  info = (message: string, meta?: any): void => {
    this.loggerInstance.info(message, meta);
  };

  error = (message: string, meta: any): void => {
    this.loggerInstance.error(message, { err: meta });
  };

  warn = (message: string, meta?: any): void => {
    this.loggerInstance.warn(message, meta);
  };
  debug = (message: string, meta?: any): void => {
    this.loggerInstance.debug(message, meta);
  };

  static createTransport = () => {
    const customTransports = [];

    if (config().application_logging.file) {
      customTransports.push(
        new transports.File({
          filename: config().application_logging.file,
          level: config().application_logging.level,
        }),
      );
    }

    if (config().application_logging.console) {
      customTransports.push(
        new transports.Console({
          level: config().application_logging.level,
        }),
      );
    }
    return customTransports;
  };
}

export default new Logger();
// export class LoggerFactory {
//   private static instance: LoggerFactory;
//   loggers: LoggerOptions;
//   LogLocation: string;

//   constructor() {
//     this.loggers = {};
//   }

//   static getInstance(LogLocation: string) {
//     if (!LoggerFactory.instance) {
//       LoggerFactory.instance = new LoggerFactory();
//       LoggerFactory.instance.LogLocation = LogLocation;
//     }
//     return LoggerFactory.instance;
//   }

//   getLogger = (level: LoggerLevel) => {
//     if (!this.loggers[level]) {
//       const logger = createLogger({
//         level: level,
//         format: format.combine(format.timestamp(), format.json()),
//         transports: [new transports.Console(), new transports.File({ filename: `logs/${this.LogLocation}/${level}.log` })],
//       });
//       this.loggers[level] = logger;
//     }
//     return this.loggers[level];
//   };
// }
