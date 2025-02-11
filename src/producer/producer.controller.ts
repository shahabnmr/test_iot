import { Controller, Post } from '@nestjs/common';
import { ProducerService } from './producer.service';

@Controller('producer')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post('signal')
  async sendSignal() {
    return this.producerService.sendSampleData();
  }
}
