import { Injectable } from '@nestjs/common';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';

@Injectable()
export class ProducerService {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  sendSampleData() {
    const sampleData = {
      deviceId: '66bb584d4ae73e488c30a072',
      time: 1735683480000,
      data: [
        [762, [51.339764, 12.339223, 1.2038]],
        [1766, [51.339777, 12.339211, 1.5316]],
      ],
    };
    this.rabbitMQService.sendToQueue(sampleData);
    return { message: '🚀 Sample X-Ray Data Sent!' };
  }
}
