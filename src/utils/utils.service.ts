import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {

  getCurrentTime(): string {
    return new Date().toLocaleTimeString();
  }


  getRandomNumber(): number {
    return Math.floor(Math.random() * 101);
  }

  getRandomPower(): { base: number; power: number; result: number } {
    const power = Math.floor(Math.random() * 4) + 2;
    const result = Math.pow(4, power);
    return { base: 4, power, result };
  }
}
