import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePackageDto {
  @IsString()
  @IsNotEmpty()
  packageName: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsInt()
  duration: number;

  @IsBoolean()
  activeFlag: boolean;
}
