import { Controller, Get } from '@nestjs/common';
import { UtilsService } from './utils.service';


@Controller('api')
export class UtilsController {

  constructor(private readonly utilsService: UtilsService) {}

  @Get('time')
  getTime() {
    return { time: this.utilsService.getCurrentTime() };
  }

  @Get('random-number')
  getRandomNumber() {
    return { number: this.utilsService.getRandomNumber() };
  }

  @Get('random-power')
  getRandomPower() {
    return this.utilsService.getRandomPower();
  }
}