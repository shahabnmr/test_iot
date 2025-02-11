import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  Min,
  IsOptional,
  IsString,
  IsNotEmpty,
  Length,
} from 'class-validator';

export class QueryDto {
  @ApiPropertyOptional({
    description: 'startTime',
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'startTime must be an integer' })
  @Min(1, { message: 'startTime must be at least 1' })
  startTime?: number;

  @ApiPropertyOptional({
    description: 'endTime',
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'endTime must be an integer' })
  @Min(1, { message: 'endTime must be at least 1' })
  endTime?: number;

  @ApiProperty({
    example: '66bb584d4ae73e488c30a072',
    description: 'Unique device ID',
  })
  @IsString()
  @Length(1, 30)
  @IsNotEmpty()
  deviceId: string;
}
