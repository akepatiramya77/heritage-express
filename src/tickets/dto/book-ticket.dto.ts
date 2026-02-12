import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

class PassengerDto {

  @ApiProperty({ example: 'Ramya Sri' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 21 })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  age: number;

  @ApiProperty({ example: 'FEMALE' })
  @IsString()
  @IsNotEmpty()
  gender: string;
}

export class BookTicketDto {

  @ApiProperty({ example: 8 })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  seatAllocationId: number;

  @ApiProperty({ type: PassengerDto })
  @ValidateNested()
  @Type(() => PassengerDto)
  @IsNotEmpty()
  passenger: PassengerDto;
}
