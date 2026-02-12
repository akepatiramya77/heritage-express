import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsNotEmpty,
  Min,
} from 'class-validator';

export class CreateCoachDto {

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  trainId: number;

  @ApiProperty({ example: 'A1' })
  @IsString()
  @IsNotEmpty()
  coachCode: string;

  @ApiProperty({ example: 'AC' })
  @IsString()
  @IsNotEmpty()
  coachType: string;

  @ApiProperty({ example: 48 })
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  seatCount: number;
}
