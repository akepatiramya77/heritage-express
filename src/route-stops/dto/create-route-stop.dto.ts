import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  IsNotEmpty,
  Min,
  Matches,
} from 'class-validator';

export class CreateRouteStopDto {

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  routeId: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  @IsNotEmpty()
  stationId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  stopOrder: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  dayNo: number;

  @ApiProperty({ example: '08:30:00', required: false })
  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'arrivalTime must be in HH:mm:ss format',
  })
  arrivalTime?: string;

  @ApiProperty({ example: '08:45:00', required: false })
  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'departureTime must be in HH:mm:ss format',
  })
  departureTime?: string;

  @ApiProperty({ example: 120, required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  distanceFromStart?: number;
}
