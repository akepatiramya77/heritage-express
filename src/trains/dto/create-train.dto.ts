import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateTrainDto {

  @ApiProperty({ example: '10001' })
  @IsString()
  @IsNotEmpty()
  trainNo: string;

  @ApiProperty({ example: 'Heritage Express' })
  @IsString()
  @IsNotEmpty()
  trainName: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  packageId: number;

  @ApiProperty({ example: '2026-03-01' })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ example: '2026-03-10', required: false })
  @IsDateString()
  @IsOptional()
  endDate?: string;
}
