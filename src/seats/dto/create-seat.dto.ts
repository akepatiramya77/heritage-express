import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateSeatDto {

  @ApiProperty({ example: '1A' })
  @IsString()
  @IsNotEmpty()
  seatNo: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  coachId: number;
}
