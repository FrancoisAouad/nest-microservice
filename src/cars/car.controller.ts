import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CarService } from './car.service';
import { LoggerInterceptor } from 'src/global/logger/logger.interceptor';

@Controller()
@UseInterceptors(LoggerInterceptor)
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get('/')
  async getHello() {
    return await this.carService.getHello();
  }
}
