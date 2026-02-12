import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreatePassengerDto {

  @ApiProperty({ example: 'Ramya Sri' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 25 })
  @IsInt()
  @Min(0)
  age: number;

  @ApiProperty({ example: 'FEMALE' })
  @IsString()
  @IsNotEmpty()
  gender: string;
}
