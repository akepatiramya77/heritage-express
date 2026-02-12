import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStationDto {

  @ApiProperty({ example: 'NDLS' })
  @IsString()
  @IsNotEmpty()
  stationCode: string;

  @ApiProperty({ example: 'New Delhi' })
  @IsString()
  @IsNotEmpty()
  stationName: string;
}
