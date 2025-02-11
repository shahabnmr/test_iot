import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateSignalDto {
  @ApiProperty({
    example: '66bb584d4ae73e488c30a072',
    description: 'Unique device ID',
  })
  @IsString()
  @IsNotEmpty()
  deviceId: string;

  @ApiProperty({
    example: 1735683480000,
    description: 'Timestamp of the X-ray data',
  })
  @IsNumber()
  time: number;

  @ApiProperty({
    example: [[762, [51.339764, 12.339223, 1.2038]]],
    description: 'Array of X-ray data points',
  })
  @IsArray()
  @ArrayNotEmpty()
  data: [];
}
