import { IsBoolean, IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdatePackageDto {
  @IsOptional()
  @IsString()
  packageName?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsInt()
  duration?: number;

  @IsOptional()
  @IsBoolean()
  activeFlag?: boolean;
}
