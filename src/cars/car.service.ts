import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import logger from '../global/logger/logger';

@Injectable()
export class CarService {
  constructor(private readonly sequelize: Sequelize) {}
  getHello = async () => {
    const options = {
      type: QueryTypes.SELECT,
    };
    const query = 'SELECT * FROM cars';

    try {
      const result = await this.sequelize.query(query, options);
      logger.info(`Executed the query "${query}" with options: ${JSON.stringify(options)} successfully`);
      return result;
    } catch (error) {
      logger.error(`Failed to execute the query '${query}' with options: ${JSON.stringify(options)}. Error message: ${error.message}`, {
        err: error,
      });
    }
  };
}
