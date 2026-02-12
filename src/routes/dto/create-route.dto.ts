import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateRouteDto {

  @ApiProperty({ example: 'Delhi to Agra Route' })
  @IsString()
  @IsNotEmpty()
  routeName: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  packageId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  fromStationId: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @IsNotEmpty()
  toStationId: number;

  @ApiProperty({ example: 220 })
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  distanceKm: number;
}
