import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class ParamsDto {
  @ApiProperty({
    example: '66bb584d4ae73e488c30a072',
    description: 'Unique device ID',
  })
  @IsString()
  @Length(1, 30)
  @IsNotEmpty()
  id: string;
}
