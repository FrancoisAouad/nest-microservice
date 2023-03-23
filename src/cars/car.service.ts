import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import { LoggerFactory } from '../global/logger/logger.factory';

@Injectable()
export class CarService {
  constructor(private readonly sequelize: Sequelize) {}
  getHello = async () => {
    const loggerFactory = LoggerFactory.getInstance('cars');
    const infoLogger = loggerFactory.getLogger('info');
    const options = {
      type: QueryTypes.SELECT,
    };
    const query = 'SELECT * FROM cars';

    try {
      const result = await this.sequelize.query(query, options);
      infoLogger.info(`Executed the query "${query}" with options: ${JSON.stringify(options)} successfully`);
      return result;
    } catch (error) {
      const errorLogger = loggerFactory.getLogger('error');
      errorLogger.error(`Failed to execute the query "${query}" with options: ${JSON.stringify(options)}. Error message: ${error.message}`);
    }
  };
}
