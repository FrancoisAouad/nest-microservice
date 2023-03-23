import { LoggerOptions, format, createLogger, transports } from 'winston';
import { LoggerLevel } from '../types/global.types';

export class LoggerFactory {
  private static instance: LoggerFactory;
  loggers: LoggerOptions;
  LogLocation: string;

  constructor() {
    this.loggers = {};
  }

  static getInstance(LogLocation: string) {
    if (!LoggerFactory.instance) {
      LoggerFactory.instance = new LoggerFactory();
      LoggerFactory.instance.LogLocation = LogLocation;
    }
    return LoggerFactory.instance;
  }

  getLogger = (level: LoggerLevel) => {
    if (!this.loggers[level]) {
      const logger = createLogger({
        level: level,
        format: format.combine(format.timestamp(), format.json()),
        transports: [new transports.Console(), new transports.File({ filename: `logs/${this.LogLocation}/${level}.log` })],
      });
      this.loggers[level] = logger;
    }
    return this.loggers[level];
  };
}
