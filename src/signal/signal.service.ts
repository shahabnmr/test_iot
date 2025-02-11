import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Signal } from './signal.schema';

@Injectable()
export class SignalService {
  constructor(
    @InjectModel(Signal.name) private readonly signalModel: Model<Signal>,
  ) {}

  async getFiltered(deviceId: string, startTime?: number, endTime?: number) {
    const query: any = { deviceId };
    if (startTime) query.time = { $gte: startTime };
    if (endTime) query.time = { ...query.time, $lte: endTime };
    return this.signalModel.find().exec();
  }

  async getById(id: string) {
    const result = await this.signalModel.findById(id).exec();
    return result;
  }

  async create(data_: any) {
    const { deviceId, time, data } = data_;
    const dataLength = data.length;
    const dataVolume = data.reduce((acc, item) => acc + item[1][2], 0);

    const newSignal = await this.signalModel.create({
      deviceId,
      time,
      dataLength,
      dataVolume,
    });

    return newSignal;
  }
}
