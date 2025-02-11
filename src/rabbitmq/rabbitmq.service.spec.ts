import { Test, TestingModule } from '@nestjs/testing';
import { RabbitMQService } from './rabbitmq.service';
import { SignalService } from '../signal/signal.service';

describe('RabbitMQService', () => {
  let service: RabbitMQService;
  let signalService: SignalService;
  let mockChannel: any;

  beforeEach(async () => {
    mockChannel = {
      consume: jest.fn((queue, callback) => {
        const fakeMessage = {
          content: Buffer.from(
            JSON.stringify({
              deviceId: '66bb584d4ae73e488c30a072',
              time: 1735683480000,
              data: [[762, [51.339764, 12.339223, 1.2038]]],
            }),
          ),
        };
        callback(fakeMessage);
      }),
      sendToQueue: jest.fn(),
      ack: jest.fn(),
    };
    const mockConnection = {
      createChannel: jest.fn().mockResolvedValue(mockChannel),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RabbitMQService,
        {
          provide: SignalService,
          useValue: {
            create: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: 'RABBITMQ_CONNECTION',
          useValue: mockConnection,
        },
      ],
    }).compile();

    service = module.get<RabbitMQService>(RabbitMQService);
    signalService = module.get<SignalService>(SignalService);

    (service as any).channel = mockChannel;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should process messages and store in database', async () => {
    const sampleMessage = {
      deviceId: '66bb584d4ae73e488c30a072',
      time: 1735683480000,
      data: [[762, [51.339764, 12.339223, 1.2038]]],
    };

    await service.consumeMessages();

    expect(signalService.create).toHaveBeenCalledWith(sampleMessage);
    expect(mockChannel.ack).toHaveBeenCalledTimes(1);
  });
});
