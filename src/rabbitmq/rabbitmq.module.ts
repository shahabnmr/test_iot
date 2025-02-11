import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { SignalModule } from 'src/signal/signal.module';

@Module({
  providers: [RabbitMQService],
  imports: [SignalModule],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
