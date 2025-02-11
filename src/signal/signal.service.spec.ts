import { Test, TestingModule } from '@nestjs/testing';
import { SignalService } from './signal.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Signal } from './signal.schema';

class MockSignalModel {
  constructor(private data: any) {}

  save = jest.fn().mockResolvedValue(this.data);

  static create = jest.fn().mockImplementation((data) => {
    return new MockSignalModel(data);
  });

  static find = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue([]),
  });
}

describe('SignalService', () => {
  let service: SignalService;
  let model: Model<Signal>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignalService,
        { provide: getModelToken(Signal.name), useValue: MockSignalModel },
      ],
    }).compile();

    service = module.get<SignalService>(SignalService);
    model = module.get<Model<Signal>>(getModelToken(Signal.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save X-Ray data correctly', async () => {
    const sampleData = {
      deviceId: '66bb584d4ae73e488c30a072',
      time: 1735683480000,
      data: [[762, [51.339764, 12.339223, 1.2038]]],
    };

    jest
      .spyOn(model, 'create')
      .mockImplementationOnce((data: any) =>
        Promise.resolve({ _id: 'test-id', ...data }),
      );

    const result = await service.create(sampleData);
    expect(result.deviceId).toEqual(sampleData.deviceId);
    expect(result.time).toEqual(sampleData.time);
    expect(result.dataLength).toEqual(1);
    expect(result.dataVolume).toEqual(1.2038);
  });

  it('get data saved', async () => {
    const result = await service.getFiltered('device123');
    expect(result).toEqual([]);
    expect(model.find).toHaveBeenCalled();
    expect(model.find().exec).toHaveBeenCalled();
  });
});
