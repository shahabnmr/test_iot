import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';
import * as dotenv from 'dotenv';

import { SignalService } from '../signal/signal.service';

@Injectable()
export class RabbitMQService implements OnModuleInit {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  constructor(private readonly signalsService: SignalService) {}

  async onModuleInit() {
    this.connection = await amqp.connect(process.env.RABBITMQ_URL);
    this.channel = await this.connection.createChannel();

    await this.channel.assertQueue(process.env.RABBITMQ_QUEUE, {
      durable: true,
    });

    console.log('✅ RabbitMQ connected & queue asserted!');
    this.consumeMessages();
  }

  async consumeMessages() {
    this.channel.consume(process.env.RABBITMQ_QUEUE, async (msg) => {
      if (msg !== null) {
        const xrayData = JSON.parse(msg.content.toString());
        console.log('📥 Received X-Ray Data:', xrayData);

        await this.signalsService.create(xrayData);

        this.channel.ack(msg);
      }
    });
  }

  async sendToQueue(data: any) {
    this.channel.sendToQueue(
      process.env.RABBITMQ_QUEUE,
      Buffer.from(JSON.stringify(data)),
    );
  }
}
