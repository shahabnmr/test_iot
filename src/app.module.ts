import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { SignalModule } from './signal/signal.module';
import { ProducerModule } from './producer/producer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    RabbitMQModule,
    SignalModule,
    ProducerModule,
  ],
})
export class AppModule {}
