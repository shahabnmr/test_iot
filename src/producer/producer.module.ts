import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { RabbitMQModule } from 'src/rabbitmq/rabbitmq.module';
import { ProducerController } from './producer.controller';

@Module({
  imports: [RabbitMQModule],
  controllers: [ProducerController],
  providers: [ProducerService],
  exports: [ProducerService],
})
export class ProducerModule {}
