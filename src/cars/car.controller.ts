import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { CarService } from './car.service';
import { LoggerInterceptor } from 'src/global/logger/logger.interceptor';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Cars')
@UseInterceptors(LoggerInterceptor)
@UseGuards()
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get('/')
  async getHello() {
    return await this.carService.getHello();
  }
}
