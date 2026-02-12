import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  Min,
  IsDateString,
} from 'class-validator';

export class CreateSeatAllocationDto {

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  trainId: number;

  @ApiProperty({ example: '2026-03-01' })
  @IsDateString()
  @IsNotEmpty()
  travelDate: string;
}
