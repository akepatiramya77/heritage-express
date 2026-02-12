import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
} from 'class-validator';

export enum UserRole {
  ADMIN = 'ADMIN',
  AGENT = 'AGENT',
  GUEST = 'GUEST',
}

export class CreateUserDto {

  @ApiProperty({ example: 'ramya_sri' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'ramya@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'StrongPassword123' })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'ADMIN', enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;
}
